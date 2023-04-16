import { ProgramChunk } from "../../common/interfaces/program-chunk.interface";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import styled from "@emotion/styled";

interface Props {
  chunks: ProgramChunk[];
  currIndex: number;
  handleRemove: (id: string) => void;
  handleReorder: (sourceIndex: number, destinationIndex: number) => void;
}

const StyledList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  background-color: #141414;
  padding: 1rem;
  margin: 1rem auto
`;

const ChunkContainer = styled.div<{ active: boolean }>`
  padding: 0.4rem;
  text-align: center;
  background-color: #444444;
  color: #fff;
  font-size: 1.2rem;
  border-radius: 6px;
  border: ${( { active }) => active ? "1px solid red" : "1px solid black"};
  &:hover {
    background-color: #393939;
  }
`;

const ProgramChunkList = ({ chunks, currIndex, handleReorder }: Props) => {
  return (
    <DragDropContext
      onDragEnd={({ source, destination }) =>
        handleReorder(source.index, destination?.index ?? source.index)
      }
    >
      <Droppable droppableId="program">
        {(provided) => (
          <StyledList {...provided.droppableProps} ref={provided.innerRef}>
            {chunks.map((chunk, i) => (
              <Draggable key={chunk.id} draggableId={chunk.id} index={i}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ChunkContainer active={currIndex === i}>
                      {chunk.measures} bar{chunk.measures > 1 ? "s" : ""} of{" "}
                      {chunk.metre} at {chunk.tempo} bpm
                    </ChunkContainer>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </StyledList>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ProgramChunkList;
