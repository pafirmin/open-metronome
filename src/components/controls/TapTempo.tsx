import styled from "@emotion/styled";
import { useState } from "react";
import { useMetronome } from "../../hooks";

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
  const { VITE_MIN_TEMPO, VITE_MAX_TEMPO } = import.meta.env;
  const { setValues } = useMetronome();
  const [reference, setReference] = useState(0);

  const handleTap = () => {
    const time = performance.now();

    if (reference) {
      const interval = time - reference;
      let newTempo = Math.round(60 / (interval / 1000));

      if (newTempo > VITE_MAX_TEMPO) {
        newTempo = VITE_MAX_TEMPO;
      } else if (newTempo < VITE_MIN_TEMPO) {
        newTempo = VITE_MIN_TEMPO;
      }

      setValues((prev) => ({ ...prev, tempo: newTempo }));
    }
    setReference(time);
  };

  return <TapBtn onClick={handleTap}>Tap Tempo</TapBtn>;
};

export default TapTempo;
