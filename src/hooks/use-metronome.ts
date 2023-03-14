import { useEffect, useState } from "react";
import useTicker from "./use-ticker";

export default function useMetronome() {
  const ticker = useTicker()
  const [tempo, setTempo] = useState(ticker.tempo);
  const [metre, setMetre] = useState(ticker.metre);
  const [beatCount, setBeatCount] = useState(ticker.currBeat);

  useEffect(() => {
    ticker.tempo = tempo;
  }, [ticker, tempo]);

  useEffect(() => {
    ticker.metre = tempo;
  }, [ticker, metre]);

  useEffect(() => {
    ticker.onTick(() => setBeatCount((prev) => prev + 1));
  }, [ticker]);

  const startTicker = () => {
    ticker.init();
  };

  return {
    tempo, setTempo, metre, setMetre, beatCount, setBeatCount
  };
}
