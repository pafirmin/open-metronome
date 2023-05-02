import { useEffect, useState } from "react";
import { useMetronome } from "./";
import useConfig from "./use-config";

const useTapTempo = () => {
  const { setValues } = useMetronome();
  const [{ MIN_TEMPO, MAX_TEMPO }] = useConfig();
  const [reference, setReference] = useState(0);

  const handleTap = () => {
    const time = performance.now();

    if (reference) {
      const interval = time - reference;
      const newTempo = Math.round(60 / (interval / 1000));
      const clamped = Math.max(MIN_TEMPO, Math.min(newTempo, MAX_TEMPO));

      setValues((prev) => ({ ...prev, tempo: clamped }));
    }
    setReference(time);
  };

  useEffect(() => {
    const timeout = setTimeout(() => setReference(0), 3000);

    return () => clearTimeout(timeout);
  }, [reference]);

  return handleTap;
};

export default useTapTempo;
