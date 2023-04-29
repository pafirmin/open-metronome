import { useEffect, useMemo, useState } from "react";
import { ProgramChunk } from "../common/interfaces/program-chunk.interface";
import useMetronome from "./use-metronome";

/**
 * useProgrammer manages the creation of custom practice routines
 */

export default function useProgrammer() {
  const { beatCount, setValues, isRunning } = useMetronome();
  const [routine, setRoutine] = useState<ProgramChunk[]>([]);
  const [offset, setOffset] = useState(0);

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

  useEffect(() => {
    if (!currChunk) return;

    if (beatCount.total - offset === currChunk.measures * currChunk.metre + 1) {
      setCurrIndex((prev) => (prev + 1) % routine.length);
      setOffset((prev) => prev + currChunk.measures * currChunk.metre);
    }
  }, [currChunk, beatCount.total, offset, routine.length]);

  useEffect(() => {
    if (!isRunning) {
      setCurrIndex(0);
      setOffset(0);
    }
  }, [isRunning]);

  const appendChunk = (chunk: ProgramChunk) => {
    setRoutine((old) => [...old, chunk]);
  };

  /**
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
