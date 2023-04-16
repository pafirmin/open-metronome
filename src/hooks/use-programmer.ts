import { useEffect, useMemo, useState } from "react";
import { ProgramChunk } from "../common/interfaces/program-chunk.interface";
import useMetronome from "./use-metronome";

/***
 * useProgrammer manages the creation of custom practice routines
 */

export default function useProgrammer() {
  const { beatCount, setValues, isRunning } = useMetronome();
  const [routine, setRoutine] = useState<ProgramChunk[]>([]);
  const [beatOffset, setBeatOffset] = useState(0);
  // The index of the current program chunk
  const [currIndex, setCurrIndex] = useState(0);

  const currChunk = useMemo(() => routine[currIndex], [routine, currIndex]);

  // When currChunk changes, set metronome values to new chunk settings
  useEffect(() => {
    if (!currChunk) return;

    setValues((prev) => ({
      ...prev,
      tempo: currChunk.tempo,
      metre: currChunk.metre,
      silent: currChunk.silent,
    }));
  }, [currChunk, setValues]);

  // Increment measuresCompleted when a chunk finishes a measure
  useEffect(() => {
    if (!currChunk) return;

    const isLastBeat = beatCount - 1 - beatOffset === currChunk.measures * currChunk.metre;
    if (isLastBeat) {
        /***
         * On final beat of current chunk: if chunk is last in routine, reset
         * currIndex to 0. Else, increment currIndex to move routine along.
         */
      setBeatOffset((prev) => prev + currChunk.measures * currChunk.metre)
      setCurrIndex((currIndex + 1) % routine.length);
    }
  }, [beatCount, currChunk, currIndex, beatOffset, routine.length]);

  useEffect(() => {
    if (!isRunning && currIndex !== 0) {
      setCurrIndex(0);
      setBeatOffset(0);
    }
  }, [isRunning, currIndex]);

  const appendChunk = (chunk: ProgramChunk) => {
    if (routine.length === 0) {
      setValues((prev) => ({
        ...prev,
        tempo: chunk.tempo,
        metre: chunk.metre,
        silent: chunk.silent,
      }));
    }

    setRoutine((old) => [...old, chunk]);
  };

  /***
   * Removes the ProgramChunk with the given id
   * @param index - the id of the ProgramChunk to remove
   */
  const removeChunk = (id: string) => {
    setRoutine((old) => old.filter((chunk) => chunk.id !== id));
  };

  const reorder = (source: number, destination: number) => {
    const reordered = [...routine];
    const [chunk] = reordered.splice(source, 1);
    reordered.splice(destination, 0, chunk);
    const newIndex = reordered.indexOf(currChunk);

    if (newIndex !== currIndex) {
      setCurrIndex(newIndex);
    }

    setRoutine(reordered);
  };

  return { routine, appendChunk, removeChunk, currIndex, reorder };
}
