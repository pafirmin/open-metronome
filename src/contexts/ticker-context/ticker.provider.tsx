import { ReactNode, useEffect, useRef, useState } from "react";
import Ticker from "../../ticker";
import TickerContext from "./ticker.context";

interface Props {
  children: ReactNode;
  ticker: Ticker;
}

const TickerProvider = ({ ticker, children }: Props) => {
  const tickerRef = useRef(ticker);
  const [tempo, setTempo] = useState(ticker.tempo);
  const [metre, setMetre] = useState(ticker.metre);
  const [beatCount, setBeatCount] = useState(ticker.currBeat);
  const [division, setDivision] = useState(ticker.division);

  useEffect(() => {
    tickerRef.current.tempo = tempo;
  }, [tickerRef.current.tempo, tempo]);

  useEffect(() => {
    tickerRef.current.metre = metre;
  }, [tickerRef.current.metre, metre]);

  useEffect(() => {
    tickerRef.current.division = division;
  }, [tickerRef.current.division, division]);

  useEffect(() => {
    tickerRef.current.onTick(() => setBeatCount((prev) => prev + 1));
  }, [tickerRef.current]);

  const startPulse = () => {
    tickerRef.current.init();
  };

  const reset = () => {
    tickerRef.current.reset();
  };

  const val = {
    tempo,
    setTempo,
    metre,
    setMetre,
    beatCount,
    setBeatCount,
    division,
    setDivision,
    startPulse,
    reset,
    isPlaying: tickerRef.current.isRunning,
  };

  return (
    <TickerContext.Provider value={val}>
      {children}
    </TickerContext.Provider>
  );
};

export default TickerProvider;
