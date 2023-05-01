import ReactSlider from "react-slider";
import { useMetronome } from "../../hooks";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { IconButton, Stack } from "../common";
import styled from "@emotion/styled";
import useConfig from "../../hooks/use-config";

const Wrapper = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const ClassicMode = () => {
  const [{ MIN_TEMPO, MAX_TEMPO }] = useConfig();
  const { values, setValues } = useMetronome();

  const handleTempo = (val: number) => {
    setValues((prev) => ({ ...prev, tempo: val }));
  };

  const handleAdjustMetre = (change: number) => {
    setValues((prev) => ({ ...prev, metre: prev.metre + change }));
  };

  return (
    <Wrapper>
      <div style={{ flexGrow: 1 }}>
        <h2>Tempo</h2>
        <ReactSlider
          value={values.tempo}
          min={MIN_TEMPO}
          max={MAX_TEMPO}
          onChange={handleTempo}
          trackClassName={"sliderTrack"}
          thumbClassName={"sliderThumb"}
          className={"slider"}
        />
      </div>

      <div>
        <h2>Metre</h2>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          style={{ fontSize: "1.4rem", margin: "auto", width: "120px" }}
        >
          <IconButton
            aria-label="decrement metre"
            onClick={() => handleAdjustMetre(-1)}
          >
            <AiOutlineMinusCircle />
          </IconButton>
          <span>{values.metre}</span>
          <IconButton
            aria-label="increment metre"
            onClick={() => handleAdjustMetre(1)}
          >
            <AiOutlinePlusCircle />
          </IconButton>
        </Stack>
      </div>
    </Wrapper>
  );
};

export default ClassicMode;
