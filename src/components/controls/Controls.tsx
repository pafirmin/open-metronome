import styled from "@emotion/styled";
import { useMetronome } from "../../hooks";
import { useEffect, useState } from "react";
import { IconButton, Slider } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";

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
  const m = useMetronome();
  const [sliderVal, setSliderVal] = useState(m.tempo);

  const handleTempo = (val: number) => {
    m.setTempo(val)
  };

  const incrementMetre = () => {
    m.setMetre((prev) => prev + 1);
  };

  const decrementMetre = () => {
    m.setMetre((prev) => prev - 1);
  };

  const setQuarterNote = () => {
    m.setDivision(1);
  };

  const setEighthNote = () => {
    m.setDivision(0.5);
  };

  useEffect(() => {
    setSliderVal(m.tempo)
  }, [m.tempo])

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
      <StartBtn onClick={m.isRunning ? m.reset : m.startPulse}>
        {m.isRunning ? "Stop" : "Start"}
      </StartBtn>
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
              onClick={decrementMetre}
              aria-label="decrement meter"
              size="large"
            >
              <RemoveIcon fontSize="large" />
            </IconButton>
            <span>{m.metre}</span>
            <IconButton
              onClick={incrementMetre}
              aria-label="increment meter"
              size="large"
            >
              <AddIcon fontSize="large" />
            </IconButton>
          </ControlContainer>
        </div>
        <div style={{ width: "150px" }}>
          <span style={{ display: "block" }}>Note</span>
          <ControlContainer>
            <NoteValue
              onClick={setQuarterNote}
              role="button"
              tabIndex={0}
              aria-label="Quarter note pulse"
              selected={m.division === 1}
            >
              ♩
            </NoteValue>
            <NoteValue
              onClick={setEighthNote}
              role="button"
              tabIndex={0}
              aria-label="Eighth note pulse"
              selected={m.division === 0.5}
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
