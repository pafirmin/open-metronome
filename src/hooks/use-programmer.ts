import { useEffect, useState } from "react";
import useMetronome from "./use-metronome";

/***
 * A ProgramChunk represents one portion of a custom practice routine
 */

interface ProgramChunk {
  tempo: number;
  measures: number;
  metre: number;
  silent: boolean;
}

/***
 * useProgrammer manages the creation of custom practice routines
 */

export default function useProgrammer() {
  const { beatCount, setValues, isRunning } = useMetronome();
  const [routine, setRoutine] = useState<ProgramChunk[]>([]);

  // The index of the current program chunk
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    // When currIndex changes, set metronome values to new chunk settings
    const currChunk = routine[currIndex];

    if (!currChunk) return;

    setValues((prev) => ({
      ...prev,
      tempo: currChunk.tempo,
      metre: currChunk.metre,
      silent: currChunk.silent,
    }));
  }, [currIndex]);

  useEffect(() => {
    const currChunk = routine[currIndex];

    /***
     * On final beat of curent chunk: if chunk is last in routine, reset
     * currIndex to 0. Else, increment currIndex to move routine along.
     */
    if (currChunk.metre * currChunk.measures === beatCount) {
      setCurrIndex((currIndex + 1) % routine.length);
    }
  }, [beatCount]);

  useEffect(() => {
    if (!isRunning && currIndex !== 0) {
      setCurrIndex(0);
    }
  }, [isRunning]);

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
   * Removes the ProgramChunk at the given index
   * @Param {number} index: the index of the ProgramChunk to remove
   */
  const removeChunk = (index: number) => {
    setRoutine((old) => old.filter((_, i) => i !== index));
  };

  return { routine, appendChunk, removeChunk };
}
