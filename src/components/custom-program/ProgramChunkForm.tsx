import styled from "@emotion/styled";
import { ChangeEvent, useState } from "react";
import { ProgramChunk } from "../../common/interfaces/program-chunk.interface";

interface Props {
  onSubmit: (chunk: ProgramChunk) => void;
}

const ProgramForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  gap: 0.5rem;
  font-size: 1.2rem;
`;

const NumberInput = styled.input`
  width: 50px;
  height: 20px;
`;

const ProgramChunkForm = ({ onSubmit }: Props) => {
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
        name="measures"
        value={chunkValues.measures}
        onChange={handleChange}
      />
      <span>bars of</span>
      <NumberInput
        type="number"
        name="metre"
        value={chunkValues.metre}
        onChange={handleChange}
      />
      <span>at</span>
      <NumberInput
        type="number"
        name="tempo"
        value={chunkValues.tempo}
        onChange={handleChange}
      />
      <span>bpm</span>
      <button>add</button>
    </ProgramForm>
  );
};

export default ProgramChunkForm;
