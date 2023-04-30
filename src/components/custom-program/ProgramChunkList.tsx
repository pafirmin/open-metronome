import { ProgramChunk } from "../../common/interfaces/program-chunk.interface";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import styled from "@emotion/styled";
import { useState } from "react";
import { IconButton } from "@mui/material";

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
  background-color: #141414;
  padding: 1rem;
  margin: 1rem auto;
`;

const ChunkContainer = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem;
  text-align: center;
  background-color: #444444;
  color: #fff;
  font-size: 1.2rem;
  border-radius: 6px;
  border: ${({ active }) => (active ? "1px solid red" : "1px solid black")};
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

  return (
    <DragDropContext
      onDragEnd={({ draggableId, source, destination }) => {
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
      }}
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
                      <span {...provided.dragHandleProps}>
                        <DragIndicatorIcon />
                      </span>
                      <span>
                        {chunk.measures} bar{chunk.measures > 1 ? "s" : ""} of{" "}
                        {chunk.metre} at {chunk.tempo} bpm{" "}
                      </span>
                      <IconButton
                        color="inherit"
                        onClick={() => handleToggleSilent(chunk)}
                        aria-label={
                          chunk.silent ? "disable silence" : "enable silence"
                        }
                      >
                        {chunk.silent ? <VolumeOffIcon /> : <VolumeUpIcon />}
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
