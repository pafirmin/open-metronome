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

const TICK_LENGTH = 0.1;

const TickerProvider = ({ audioContext, children }: Props) => {
  const ctxRef = useRef(audioContext);
  const [beatCount, setBeatCount] = useState(0);
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
   * low note on 8th notes (x.5)
   */
  const getFrequency = useCallback(() => {
    if (values.silent) {
      return 0;
    } else if (beatCount % values.metre === 1) {
      return 550;
    } else if (Number.isInteger(beatCount)) {
      return 450;
    } else {
      return 375;
    }
  }, [beatCount, values.silent, values.metre]);

  const startPulse = async () => {
    setIsRunning(true);
  };

  const reset = async () => {
    setBeatCount(1);
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

  /**
   * ctx must be resumed or created after user gesture on page
   */
  const initAudioCtx = async () => {
    const ctx = ctxRef.current;
    if (ctx.state === "running") {
      return;
    }

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
      if (!isRunning) {
        return;
      }

      const now = ctxRef.current.currentTime;
      const noteTime = now + (60 / values.tempo) * values.division;
      const delay = 1000 * (noteTime - now);

      timeout = setTimeout(() => {
        tick();

        setBeatCount((prev) => prev + 1 * values.division);

        pulse();
      }, delay);
    };

    pulse();

    return () => clearTimeout(timeout);
  }, [values, tick, isRunning]);

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
