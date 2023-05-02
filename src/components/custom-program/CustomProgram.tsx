import styled from "@emotion/styled";
import { ProgramChunk } from "../../common/interfaces/program-chunk.interface";
import useProgrammer from "../../hooks/use-programmer";
import ProgramChunkForm from "./ProgramChunkForm";
import ProgramChunkList from "./ProgramChunkList";

const Container = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const CustomProgram = () => {
  const { routine, updateRoutine, currIndex } = useProgrammer();

  const appendChunk = (chunk: ProgramChunk) => {
    const updated = [...routine, chunk];
    updateRoutine(updated);
  };

  const removeChunk = (id: string) => {
    const updated = routine.filter((chunk) => chunk.id !== id);
    updateRoutine(updated);
  };

  const updateChunk = (id: string, params: Partial<ProgramChunk>) => {
    const updated = routine.map((chunk) =>
      chunk.id === id ? { ...chunk, ...params } : chunk
    );
    updateRoutine(updated);
  };

  const reorder = (source: number, destination: number) => {
    const reordered = [...routine];
    const [chunk] = reordered.splice(source, 1);
    reordered.splice(destination, 0, chunk);

    updateRoutine(reordered);
  };

  return (
    <Container>
      <h2>Custom Program</h2>
      <ProgramChunkForm
        onSubmit={(chunk) =>
          appendChunk({ ...chunk, id: Date.now().toString() })
        }
      />
      {routine.length === 0 && <p>Create your own custom practice routine!</p>}
      <ProgramChunkList
        chunks={routine}
        currIndex={currIndex}
        handleUpdate={updateChunk}
        handleRemove={removeChunk}
        handleReorder={reorder}
      />
    </Container>
  );
};

export default CustomProgram;
