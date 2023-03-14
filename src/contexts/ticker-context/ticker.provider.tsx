import { ReactNode, useEffect, useRef, useState } from "react";
import Ticker from "../../ticker";
import TickerContext from "./ticker.context";

interface Props {
  children: ReactNode;
  ticker: Ticker;
}

const TickerProvider = ({ ticker, children }: Props) => {
  const tickerRef = useRef(ticker);

  return (
    <TickerContext.Provider value={ticker}>
      {children}
    </TickerContext.Provider>
  );
};

export default TickerProvider;
