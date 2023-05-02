import ReactSlider from "react-slider";
import { useMetronome } from "../../hooks";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { IconButton, Stack } from "../common";
import useConfig from "../../hooks/use-config";
import { Fragment } from "react";

interface Props {
  disabled?: boolean;
}

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
    <Fragment>
      <div style={{ marginBottom: "2rem" }}>
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
      </div>
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
    </Fragment>
  );
};

export default ClassicMode;
