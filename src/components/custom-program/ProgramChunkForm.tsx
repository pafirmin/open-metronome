import styled from "@emotion/styled";
import { ChangeEvent, useRef, useState } from "react";
import ReactSlider from "react-slider";
import { ProgramChunk } from "../../common/interfaces/program-chunk.interface";
import useConfig from "../../hooks/use-config";
import { IconButton, NumberInput } from "../common";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Tooltip } from "react-tooltip";

interface Props {
  onSubmit: (chunk: ProgramChunk) => void;
}

const ProgramForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const ProgramChunkForm = ({ onSubmit }: Props) => {
  const [{ MIN_TEMPO, MAX_TEMPO }] = useConfig();
  const tempoRef = useRef<HTMLInputElement>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [chunkValues, setChunkValues] = useState<ProgramChunk>({
    id: "",
    measures: 1,
    metre: 4,
    tempo: 120,
    silent: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChunkValues({
      ...chunkValues,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  return (
    <ProgramForm
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(chunkValues);
      }}
    >
      <NumberInput
        type="number"
        min={1}
        max={1000}
        name="measures"
        aria-label="number of measures"
        value={chunkValues.measures}
        onChange={handleChange}
      />
      <span>bars of</span>
      <NumberInput
        type="number"
        min={2}
        max={32}
        name="metre"
        aria-label="metre"
        value={chunkValues.metre}
        onChange={handleChange}
      />
      <span>at</span>
      <NumberInput
        id="tempo-input"
        ref={tempoRef}
        min={MIN_TEMPO}
        max={MAX_TEMPO}
        type="number"
        name="tempo"
        aria-label="tempo"
        value={chunkValues.tempo}
        onMouseOver={(e) => setAnchorEl(e.currentTarget)}
        onMouseLeave={() => setAnchorEl(null)}
        onChange={handleChange}
      />
      <Tooltip anchorSelect="#tempo-input" clickable style={{ width: "175px" }}>
        <ReactSlider
          value={chunkValues.tempo}
          min={MIN_TEMPO}
          max={MAX_TEMPO}
          onChange={(num) => setChunkValues({ ...chunkValues, tempo: num })}
          trackClassName={"sliderTrack"}
          thumbClassName={"sliderThumb"}
          className={"slider"}
        />
      </Tooltip>
      <span>bpm</span>
      <IconButton aria-label="add to routine">
        <AiOutlinePlusCircle />
      </IconButton>
    </ProgramForm>
  );
};

export default ProgramChunkForm;
