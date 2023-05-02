import { ProgramChunk } from "../../common/interfaces/program-chunk.interface";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import styled from "@emotion/styled";
import { useState } from "react";
import { OnDragEndResponder } from "react-beautiful-dnd";
import { MdOutlineDragIndicator } from "react-icons/md";
import { BsVolumeUp, BsVolumeMute } from "react-icons/bs";
import IconButton from "../common/IconButton";

interface Props {
  chunks: ProgramChunk[];
  currIndex: number;
  handleRemove: (id: string) => void;
  handleReorder: (sourceIndex: number, destinationIndex: number) => void;
  handleUpdate: (id: string, params: Partial<ProgramChunk>) => void;
}

const StyledList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin: 0;
  margin-top: 1rem;
  padding: 0;
`;

const ChunkContainer = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem;
  text-align: center;
  background-color: ${({ theme }) => theme.background.light};
  color: #fff;
  font-size: 1.2rem;
  border: ${({ active, theme }) =>
    active ? `1px solid ${theme.colors.accent.main}` : "1px solid #dfdfdf"};
  &:hover {
    background-color: #393939;
  }
`;

const TrashContainer = styled.div`
  position: fixed;
  height: 200px;
  width: 100vw;
  align-items: center;
  top: 0;
  left: 0;
`;

const TrashContent = styled.div<{ active: boolean }>`
  font-size: 3rem;
  color: #414141;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ active }) => (active ? "200px" : "0")};
  width: 100vw;
  background-color: #a6a6a6;
  opacity: ${({ active }) => (active ? "0.9" : "0")};
  transition: height 0.5s, opacity 0.5s;
`;

const ProgramChunkList = ({
  chunks,
  currIndex,
  handleReorder,
  handleRemove,
  handleUpdate,
}: Props) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleToggleSilent = (chunk: ProgramChunk) =>
    handleUpdate(chunk.id, { silent: !chunk.silent });

  const handleDrop: OnDragEndResponder = ({
    draggableId,
    source,
    destination,
  }) => {
    switch (destination?.droppableId) {
      case "program":
        handleReorder(source.index, destination?.index ?? source.index);
        break;
      case "trash":
        handleRemove(draggableId);
        break;
      default:
        break;
    }
    setIsDragging(false);
  };

  return (
    <DragDropContext
      onDragEnd={handleDrop}
      onDragStart={() => setIsDragging(true)}
    >
      <Droppable droppableId="program">
        {(provided) => (
          <StyledList {...provided.droppableProps} ref={provided.innerRef}>
            {chunks.map((chunk, i) => (
              <Draggable key={chunk.id} draggableId={chunk.id} index={i}>
                {(provided) => (
                  <li ref={provided.innerRef} {...provided.draggableProps}>
                    <ChunkContainer active={currIndex === i}>
                      <span
                        {...provided.dragHandleProps}
                        style={{
                          lineHeight: 0,
                          cursor: "grab",
                          fontSize: "1.4rem",
                        }}
                      >
                        <MdOutlineDragIndicator />
                      </span>
                      <span>
                        {chunk.measures} bar{chunk.measures > 1 ? "s" : ""} of{" "}
                        {chunk.metre} at {chunk.tempo} bpm{" "}
                      </span>
                      <IconButton onClick={() => handleToggleSilent(chunk)}>
                        {chunk.silent ? <BsVolumeMute /> : <BsVolumeUp />}
                      </IconButton>
                    </ChunkContainer>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </StyledList>
        )}
      </Droppable>
      <Droppable droppableId="trash">
        {(provided) => (
          <TrashContainer ref={provided.innerRef} {...provided.droppableProps}>
            <TrashContent active={isDragging}>
              <p>Drag to delete</p>
            </TrashContent>
          </TrashContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ProgramChunkList;
