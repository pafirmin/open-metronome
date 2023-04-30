import useProgrammer from "../../hooks/use-programmer";
import ProgramChunkForm from "./ProgramChunkForm";
import ProgramChunkList from "./ProgramChunkList";

const CustomProgram = () => {
  const { routine, appendChunk, removeChunk, currIndex, reorder, updateChunk } =
    useProgrammer();

  return (
    <div>
      <p>
        Create a custom practice routine! Get started by adding some
        instructions below.
      </p>
      <ProgramChunkForm
        onSubmit={(chunk) =>
          appendChunk({ ...chunk, id: Date.now().toString() })
        }
      />
      <ProgramChunkList
        chunks={routine}
        currIndex={currIndex}
        handleUpdate={updateChunk}
        handleRemove={removeChunk}
        handleReorder={reorder}
      />
    </div>
  );
};

export default CustomProgram;
