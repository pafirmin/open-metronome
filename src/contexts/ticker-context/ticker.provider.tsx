import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MetronomeValues } from "../../common/interfaces/metronome-values.interface";
import TickerContext from "./ticker.context";

interface Props {
  children: ReactNode;
  audioContext: AudioContext;
}

// Length of the tick sound, in milliseconds
const TICK_LENGTH = 0.1;

const TickerProvider = ({ audioContext, children }: Props) => {
  const [isInitialised, setIsInitialised] = useState(false);
  const ctxRef = useRef(audioContext);

  // Used to account for time drift
  const lastNoteTimeRef = useRef(0);

  const [beatCount, setBeatCount] = useState({ total: 0, measure: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [values, setValues] = useState<MetronomeValues>({
    tempo: 120,
    metre: 4,
    division: 1,
    silent: false,
  });

  const gainNodeRef = useRef(ctxRef.current.createGain());

  /**
   * Get the desired frequency of the next note.
   * High note on first beat,
   * mid note on quarter note pulse (integers),
   * low note on 8th notes (n.5)
   */
  const getFrequency = useCallback(
    (nextNote: number) => {
      if (values.silent) {
        return 0;
      } else if (nextNote === 1) {
        return 550;
      } else if (Number.isInteger(nextNote)) {
        return 450;
      } else {
        return 375;
      }
    },
    [values]
  );

  const startPulse = async () => {
    setIsRunning(true);
  };

  const reset = async () => {
    setBeatCount({ total: 0, measure: 0 });
    setIsRunning(false);
    lastNoteTimeRef.current = 0;
  };

  /**
   * Play an audible tick
   */
  const tick = useCallback(
    (nextNote: number) => {
      const ctx = ctxRef.current;
      const gainNode = gainNodeRef.current;
      const oscillator = ctx.createOscillator();
      const now = ctx.currentTime;

      gainNode.gain.setValueAtTime(0.04, now);
      gainNode.gain.linearRampToValueAtTime(0, now + TICK_LENGTH);
      oscillator.connect(gainNodeRef.current);
      oscillator.frequency.value = getFrequency(nextNote);
      oscillator.start();
      oscillator.stop(now + TICK_LENGTH);
    },
    [getFrequency]
  );

  const initAudioCtx = async () => {
    const ctx = ctxRef.current;
    if (ctx.state === "running") return;

    await ctxRef.current.resume();
    /**
     * Chrome can lie about when the CTX has really started. So we must use this workaround.
     */
    const startTime = ctxRef.current.currentTime;
    while (startTime === ctxRef.current.currentTime) {
      await new Promise((res) => setTimeout(res));
    }

    setIsInitialised(true);
  };

  /**
   * Set up gain node
   */
  useEffect(() => {
    gainNodeRef.current.connect(ctxRef.current.destination);
  }, []);

  /**
   * Initialise pulse
   */
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let lastBeat: number;

    const pulse = () => {
      /**
       * A hack to prevent double ticks on initial beat, where the zero delay
       * causes 'pulse' to rerun before React has updated state
       */
      if (!isRunning || lastBeat === beatCount.total) return;

      /**
       * Calculate time in future that next tick should be played, in milliseconds.
       *
       * Account for drift using the previous note time and current ctx time
       */
      const now = ctxRef.current.currentTime;
      const noteFrequency = (60 / values.tempo) * values.division;
      const nextNoteTime = (lastNoteTimeRef.current || now) + noteFrequency;
      const delay = 1000 * (nextNoteTime - now);

      timeout = setTimeout(
        () => {
          let nextBeat =
            // First beat should always be 1
            beatCount.measure === 0
              ? 1
              : (beatCount.measure % values.metre) + values.division;

          if (values.division === 1) {
            nextBeat = Math.floor(nextBeat);
          }

          tick(nextBeat);
          lastBeat = beatCount.total;
          lastNoteTimeRef.current = ctxRef.current.currentTime;

          setBeatCount((prev) => ({
            total: prev.total === 0 ? 1 : prev.total + values.division,
            measure: nextBeat,
          }));

          pulse();
        },
        beatCount.measure === 0 ? 0 : delay
      );
    };

    pulse();

    return () => clearTimeout(timeout);
  }, [values, tick, isRunning, beatCount]);

  const contextValue = {
    values,
    beatCount,
    setValues,
    startPulse,
    isRunning,
    reset,
    isInitialised,
    initAudioCtx,
  };

  return (
    <TickerContext.Provider value={contextValue}>
      {children}
    </TickerContext.Provider>
  );
};

export default TickerProvider;
