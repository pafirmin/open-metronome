import React from "react";
import { MetronomeValues } from "../../common/interfaces/metronome-values.interface";

type TickerContextValue =
  | {
      values: MetronomeValues;
      updateValues: React.Dispatch<React.SetStateAction<MetronomeValues>>;
      beatCount: { total: number; measure: number };
      reset: () => void;
      startPulse: () => void;
      isRunning: boolean;
      initAudioCtx: () => Promise<void>;
    }
  | undefined;

const TickerContext = React.createContext<TickerContextValue>(undefined);

export default TickerContext;
