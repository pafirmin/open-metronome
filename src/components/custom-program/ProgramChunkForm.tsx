import styled from "@emotion/styled";
import { ChangeEvent, FocusEvent, useState } from "react";
import { ProgramChunk } from "../../common/interfaces/program-chunk.interface";
import useConfig from "../../hooks/use-config";
import { IconButton, NumberInput } from "../common";
import { AiOutlinePlusCircle } from "react-icons/ai";

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

  const defaultValues: ProgramChunk = {
    id: "",
    measures: 1,
    metre: 4,
    tempo: 120,
    silent: false,
  };

  const [chunkValues, setChunkValues] = useState<ProgramChunk>(defaultValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChunkValues({
      ...chunkValues,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    if (!e.target.value) {
      setChunkValues({
        ...chunkValues,
        [e.target.name]: defaultValues[e.target.name as keyof ProgramChunk],
      });
    }
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
        onBlur={handleBlur}
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
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <span>at</span>
      <NumberInput
        id="tempo-input"
        min={MIN_TEMPO}
        max={MAX_TEMPO}
        type="number"
        name="tempo"
        aria-label="tempo"
        value={chunkValues.tempo}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <span>bpm</span>
      <IconButton aria-label="add to routine">
        <AiOutlinePlusCircle />
      </IconButton>
    </ProgramForm>
  );
};

export default ProgramChunkForm;
