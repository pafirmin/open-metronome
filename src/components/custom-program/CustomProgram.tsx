import styled from "@emotion/styled";
import useProgrammer from "../../hooks/use-programmer";
import ProgramChunkForm from "./ProgramChunkForm";
import ProgramChunkList from "./ProgramChunkList";

const Container = styled.div`
  border: 1px solid #dfdfdf;
  padding: 1rem;
  margin-top: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CustomProgram = () => {
  const { routine, appendChunk, removeChunk, currIndex, reorder, updateChunk } =
    useProgrammer();

  return (
    <Container>
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
