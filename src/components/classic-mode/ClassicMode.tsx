import ReactSlider from "react-slider";
import { useMetronome } from "../../hooks";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { IconButton, Stack } from "../common";
import styled from "@emotion/styled";
import useConfig from "../../hooks/use-config";

interface Props {
  disabled?: boolean;
}

const Wrapper = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const ClassicMode = ({ disabled = false }: Props) => {
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
      <div style={{ marginBottom: "2rem" }}>
        <h3>Tempo</h3>
        <ReactSlider
          aria-label="tempo"
          ariaValuetext={(state) => `${state.value}bpm`}
          value={values.tempo}
          min={MIN_TEMPO}
          max={MAX_TEMPO}
          onChange={handleTempo}
          trackClassName={"sliderTrack"}
          thumbClassName={"sliderThumb"}
          className={"slider"}
          disabled={disabled}
        />
      </div>
      <h3>Metre</h3>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ fontSize: "1.4rem", margin: "auto", width: "120px" }}
      >
        <IconButton
          aria-label="decrement metre"
          disabled={disabled}
          onClick={() => handleAdjustMetre(-1)}
        >
          <AiOutlineMinusCircle />
        </IconButton>
        <span>{values.metre}</span>
        <IconButton
          aria-label="increment metre"
          disabled={disabled}
          onClick={() => handleAdjustMetre(1)}
        >
          <AiOutlinePlusCircle />
        </IconButton>
      </Stack>
    </Wrapper>
  );
};

export default ClassicMode;
