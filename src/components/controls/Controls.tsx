import styled from "@emotion/styled";
import { useMetronome } from "../../hooks";
import { useEffect, useState } from "react";
import { IconButton, Slider } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";
import {Division} from "../../ticker/ticker";

const Wrapper = styled.div`
  margin: 1rem auto 0 auto;
  text-align: center;
  width: 100%;
`;

const ControlContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.4rem;
  margin: 0 auto;
`;

const StartBtn = styled.button`
  border-radius: 0;
  font-size: 1.6em;
  padding: 0.6rem 1rem;
  background: #425eca;
  font: inherit;
  color: inherit;
  border: 1px solid #bdbdbd;
  cursor: pointer;
  width: 100px;

  &:hover {
    background: #33489b;
  }
`;

const NoteValue = styled.span<{ selected: boolean }>`
  font-size: 1.8em;
  cursor: pointer;
  color: ${(props) => (props.selected ? "red" : "inherit")};
`;

const Controls = () => {
  const { values, setValues, isRunning, reset, startPulse } = useMetronome();
  const [sliderVal, setSliderVal] = useState(values.tempo);

  const handleTempo = (val: number) => {
    setValues((prev) => ({...prev, tempo: val}))
  };

  const handleAdjustMetre = (change: number) => {
    setValues((prev) => ({...prev, metre: prev.metre + change}))
  };

  const handleNoteValue = (val: Division) => {
    setValues((prev) => ({...prev, division: val}))
  }

  useEffect(() => {
    setSliderVal(values.tempo)
  }, [values.tempo])

  return (
    <Wrapper>
      <Slider
        value={sliderVal}
        min={Number(import.meta.env.VITE_MIN_TEMPO)}
        max={Number(import.meta.env.VITE_MAX_TEMPO)}
        onChange={(_e, newVal) => setSliderVal(newVal as number)}
        onChangeCommitted={(_e, val) => handleTempo(val as number)}
        valueLabelDisplay="auto"
        valueLabelFormat={sliderVal + " bpm"}
        color="secondary"
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <div style={{ width: "150px" }}>
          <span style={{ display: "block" }}>Metre</span>
          <ControlContainer>
            <IconButton
              onClick={() => handleAdjustMetre(-1)}
              aria-label="decrement meter"
              size="large"
            >
              <RemoveIcon fontSize="large" />
            </IconButton>
            <span>{values.metre}</span>
            <IconButton
              onClick={() => handleAdjustMetre(1)}
              aria-label="increment meter"
              size="large"
            >
              <AddIcon fontSize="large" />
            </IconButton>
          </ControlContainer>
        </div>
      <StartBtn onClick={isRunning ? reset : startPulse}>
        {isRunning ? "Stop" : "Start"}
      </StartBtn>
        <div style={{ width: "150px" }}>
          <span style={{ display: "block" }}>Note</span>
          <ControlContainer>
            <NoteValue
              onClick={() => handleNoteValue(1)}
              role="button"
              tabIndex={0}
              aria-label="Quarter note pulse"
              selected={values.division === 1}
            >
              ♩
            </NoteValue>
            <NoteValue
              onClick={() => handleNoteValue(0.5)}
              role="button"
              tabIndex={0}
              aria-label="Eighth note pulse"
              selected={values.division === 0.5}
            >
              ♫
            </NoteValue>
          </ControlContainer>
        </div>
      </div>
    </Wrapper>
  );
};

export default Controls;
