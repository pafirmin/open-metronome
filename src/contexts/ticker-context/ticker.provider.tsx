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
  const [beatCount, setBeatCount] = useState({ total: 0, measure: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState<MetronomeValues>({
    tempo: 120,
    metre: 4,
    division: 1,
    silent: false,
  });

  const gainNode = useMemo(() => ctxRef.current.createGain(), []);

  /**
   * High note on first beat,
   * mid note on quarter note pulse (integers),
   * low note on 8th notes (n.5)
   */
  const getFrequency = useCallback(() => {
    if (values.silent) {
      return 0;
    } else if (beatCount.measure === 1 || beatCount.measure === 0) {
      return 550;
    } else if (Number.isInteger(beatCount.measure)) {
      return 450;
    } else {
      return 375;
    }
  }, [beatCount, values.silent]);

  const startPulse = async () => {
    setIsRunning(true);
  };

  const reset = async () => {
    setBeatCount({ total: 0, measure: 0 });
    setIsRunning(false);
  };

  /**
   * Play an audible tick
   */
  const tick = useCallback(() => {
    const ctx = ctxRef.current;
    const oscillator = ctx.createOscillator();
    oscillator.connect(gainNode);
    oscillator.frequency.value = getFrequency();
    oscillator.start();
    oscillator.stop(ctx.currentTime + TICK_LENGTH);
  }, [getFrequency, gainNode]);

  const initAudioCtx = async () => {
    const ctx = ctxRef.current;
    if (ctx.state === "running") return;

    setIsLoading(true);

    await ctxRef.current.resume();
    /**
     * Chrome can lie about when the CTX has really started. So we must do this workaround.
     */
    const startTime = ctxRef.current.currentTime;
    while (startTime === ctxRef.current.currentTime) {
      await new Promise((res) => setTimeout(res));
    }

    setIsLoading(false);
  };

  /**
   * ctx must be resumed or created after user gesture on page
   */
  useEffect(() => {
    document.addEventListener("click", initAudioCtx);

    return () => document.removeEventListener("click", initAudioCtx);
  }, []);

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
      const noteTime = now + (60 / values.tempo) * values.division;
      const delay = 1000 * (noteTime - now);

      timeout = setTimeout(() => {
        setBeatCount((prev) => ({
          total: Math.floor(prev.total + values.division),
          /**
           * A beatcount of 0 essentially means the pulse has not started yet.
           * The first beat should *always* be 1, not the '& of 4' as it would
           * be if we incremented to 0.5 on the initial tick.
           */
          measure:
            prev.measure + values.division === values.metre + 1 ||
            prev.measure === 0
              ? 1
              : prev.measure + values.division,
        }));

        pulse();
      }, delay);
    };

    pulse();

    return () => clearTimeout(timeout);
  }, [values, tick, isRunning]);

  useEffect(() => {
    if (isRunning && beatCount.total !== 0) {
      tick();
    }
  }, [tick, isRunning, beatCount]);

  const contextValue = {
    values,
    setValues,
    beatCount,
    startPulse,
    isRunning,
    reset,
    isLoading,
    initAudioCtx,
  };

  return (
    <TickerContext.Provider value={contextValue}>
      {children}
    </TickerContext.Provider>
  );
};

export default TickerProvider;
