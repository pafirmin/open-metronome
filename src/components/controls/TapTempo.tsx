import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useMetronome } from "../../hooks";
import useConfig from "../../hooks/use-config";

const TapBtn = styled.button`
  width: 80px;
  height: 80px;
  font-size: 1.1em;
  border: 2px solid #fff;
  color: ${(props) => props.theme.colors.text.main};
  background-color: ${(props) => props.theme.background.light};
  cursor: pointer;
  border-radius: 50%;
`;

const TapTempo = () => {
  const [{ MIN_TEMPO, MAX_TEMPO }] = useConfig();
  const { setValues } = useMetronome();
  const [reference, setReference] = useState(0);

  const handleTap = () => {
    const time = performance.now();

    if (reference) {
      const interval = time - reference;
      let newTempo = Math.round(60 / (interval / 1000));

      newTempo = Math.max(MIN_TEMPO, Math.min(newTempo, MAX_TEMPO));

      setValues((prev) => ({ ...prev, tempo: newTempo }));
    }
    setReference(time);
  };

  useEffect(() => {
    const timeout = setTimeout(() => setReference(0), 3000);

    return () => clearTimeout(timeout);
  }, [reference]);

  return <TapBtn onClick={handleTap}>Tap Tempo</TapBtn>;
};

export default TapTempo;
