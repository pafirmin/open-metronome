import React from "react";
import {TickerOptions} from "../../ticker/ticker";

type TickerContextValue = {
  values: TickerOptions,
  setValues: React.Dispatch<React.SetStateAction<TickerOptions>>
  beatCount: number;
  reset: () => void
  startPulse: () => void;
  isRunning: boolean
};

const TickerContext = React.createContext<TickerContextValue>({} as any);

export default TickerContext;
