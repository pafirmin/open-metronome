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
  const [beatCount, setBeatCount] = useState(ticker.currBeat);
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
  }, [tickerRef, values]);

  useEffect(() => {
    tickerRef.current.onTick((ticker) => setBeatCount(ticker.currBeat));
    tickerRef.current.onInit(() => setIsRunning(true));
  }, [tickerRef.current]);

  const startPulse = () => {
    tickerRef.current.init();
  };

  const reset = () => {
    tickerRef.current.reset();
    setIsRunning(false);
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
