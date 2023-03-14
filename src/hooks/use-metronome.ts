import { useContext } from "react";
import TickerContext from "../contexts/ticker-context/ticker.context";

export default function useMetronome() {
  const ctx = useContext(TickerContext);

  if (!ctx) {
    throw new Error("useMetronome can only be used within a TickerProvider")
  }

  return ctx;
}
