import { useEffect, useState } from "react";
import {ProgramChunk} from "../common/interfaces/program-chunk.interface";
import useMetronome from "./use-metronome";

/***
 * useProgrammer manages the creation of custom practice routines
 */

export default function useProgrammer() {
  const { beatCount, setValues, isRunning } = useMetronome();
  const [routine, setRoutine] = useState<ProgramChunk[]>([]);
  const [measuresCompleted, setMeasuresCompleted] = useState(0)

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

    if (!currChunk) return;

    /***
     * On final beat of current chunk: if chunk is last in routine, reset
     * currIndex to 0. Else, increment currIndex to move routine along.
     */
    if (measuresCompleted === currChunk.measures) {
      setCurrIndex((currIndex + 1) % routine.length);
      setMeasuresCompleted(0)
    }
  }, [beatCount]);

  useEffect(() => {
    const currChunk = routine[currIndex];

    if (!currChunk) return;

    if (beatCount === currChunk.metre) {
      setMeasuresCompleted((prev) => prev + 1)
    }
  }, [beatCount]);

  useEffect(() => {
    if (!isRunning && currIndex !== 0) {
      setCurrIndex(0);
      setMeasuresCompleted(0)
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

  return { routine, appendChunk, removeChunk, currIndex };
}
