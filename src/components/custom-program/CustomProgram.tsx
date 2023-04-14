import useProgrammer from "../../hooks/use-programmer";
import ProgramChunkForm from "./ProgramChunkForm";

const CustomProgram = () => {
  const { routine, appendChunk, removeChunk, currIndex } = useProgrammer();
  console.log(currIndex)

  return (
    <div>
      <p>
        Create a custom practice routine! Get started by adding some
        instructions below.
      </p>
      <ProgramChunkForm onSubmit={(chunk) => appendChunk(chunk)} />
      {routine.map((chunk, i) => (
        <p key={i} style={{background: (currIndex === i ? "red" : "") }}>
          {chunk.measures} bars of {chunk.metre} at {chunk.tempo}
        </p>
      ))}
    </div>
  );
};

export default CustomProgram;
