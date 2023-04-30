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

  const gainNode = useMemo(() => ctxRef.current.createGain(), []);

  /**
   * Get the desired frequency of the NEXT note.
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
      const oscillator = ctx.createOscillator();
      oscillator.connect(gainNode);
      oscillator.frequency.value = getFrequency(nextNote);
      oscillator.start();
      oscillator.stop(ctx.currentTime + TICK_LENGTH);
    },
    [getFrequency, gainNode]
  );

  const initAudioCtx = async () => {
    const ctx = ctxRef.current;
    if (ctx.state === "running") return;

    await ctxRef.current.resume();
    /**
     * Chrome can lie about when the CTX has really started. So we must do this workaround.
     */
    const startTime = ctxRef.current.currentTime;
    while (startTime === ctxRef.current.currentTime) {
      await new Promise((res) => setTimeout(res));
    }
  };

  /**
   * Set up gain node
   */
  useEffect(() => {
    gainNode.connect(ctxRef.current.destination);
    gainNode.gain.value = -0.1;
  }, [gainNode]);

  /**
   * Initialise pulse
   */
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const pulse = () => {
      if (!isRunning) return;

      /**
       * Calculate time in future that next tick should be played, in milliseconds.
       *
       * It may be cleaner and probably more accurate to pass this to oscillator.start(),
       * but in that case beatCount would either need to be incremented before the tick
       * has actually played, or after it has finished playing (using oscillator.onended).
       *
       * Either way, the beatCount would be noticably out of sync with the audible pulse.
       */
      const now = ctxRef.current.currentTime;
      const noteTime =
        (lastNoteTimeRef.current || now) +
        (60 / values.tempo) * values.division;
      const delay = 1000 * (noteTime - now);

      timeout = setTimeout(() => {
        const nextBeat =
          beatCount.measure === 0
            ? 1
            : (beatCount.measure % values.metre) + values.division;

        tick(nextBeat);
        lastNoteTimeRef.current = ctxRef.current.currentTime;

        setBeatCount((prev) => ({
          total: prev.total === 0 ? 1 : prev.total + values.division,
          measure: nextBeat,
        }));

        pulse();
      }, delay);
    };

    pulse();

    return () => clearTimeout(timeout);
  }, [values, tick, isRunning, beatCount.measure]);

  const contextValue = {
    values,
    setValues,
    beatCount,
    startPulse,
    isRunning,
    reset,
    initAudioCtx,
  };

  return (
    <TickerContext.Provider value={contextValue}>
      {children}
    </TickerContext.Provider>
  );
};

export default TickerProvider;
