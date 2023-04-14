import React from "react";

type TickerContextValue = {
  tempo: number;
  metre: number;
  beatCount: number;
  division: number;
  reset: () => void
  startPulse: () => void;
  isRunning: boolean
  setTempo: React.Dispatch<React.SetStateAction<number>>
  setMetre: React.Dispatch<React.SetStateAction<number>>
  setDivision: React.Dispatch<React.SetStateAction<number>>
};

const TickerContext = React.createContext<TickerContextValue>({} as any);

export default TickerContext;
