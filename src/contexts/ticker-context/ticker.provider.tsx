import { ReactNode, useEffect, useRef, useState } from "react";
import Ticker from "../../ticker";
import { TickerOptions } from "../../ticker/ticker";
import TickerContext from "./ticker.context";

interface Props {
  children: ReactNode;
  ticker: Ticker;
}

const TickerProvider = ({ ticker, children }: Props) => {
  const tickerRef = useRef(ticker);
  const [beatCount, setBeatCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [values, setValues] = useState<TickerOptions>({
    tempo: 120,
    metre: 4,
    division: 1,
    silent: false,
  });

  // Update ticker to reflect changes to values
  useEffect(() => {
    tickerRef.current.setValues(values);
  }, [values]);

  // Initialise ticker callbacks
  useEffect(() => {
    tickerRef.current.onTick(() => setBeatCount((prev) => prev + 1));
    tickerRef.current.onInit(() => setIsRunning(true));
    tickerRef.current.onReset(() => {
      setBeatCount(0);
      setIsRunning(false);
    });
  }, []);

  const startPulse = () => {
    tickerRef.current.init();
  };

  const reset = () => {
    tickerRef.current.reset();
  };

  const contextValue = {
    values,
    setValues,
    beatCount,
    startPulse,
    reset,
    isRunning,
  };

  return (
    <TickerContext.Provider value={contextValue}>
      {children}
    </TickerContext.Provider>
  );
};

export default TickerProvider;
