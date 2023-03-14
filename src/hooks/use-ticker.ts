import {useContext} from "react";
import TickerContext from "../contexts/ticker-context/ticker.context";

export default function useTicker() {
  const ticker = useContext(TickerContext);

  if (!ticker) {
    throw new Error("No ticker set, use TickerProvider to set one")
  }

  return ticker;
}
