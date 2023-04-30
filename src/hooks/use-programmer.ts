import { useEffect, useMemo, useState } from "react";
import { ProgramChunk } from "../common/interfaces/program-chunk.interface";
import useMetronome from "./use-metronome";

/**
 * useProgrammer manages the creation of custom practice routines
 */

export default function useProgrammer() {
  const { beatCount, setValues, isRunning, values } = useMetronome();
  const [routine, setRoutine] = useState<ProgramChunk[]>([]);

  /**
   * The total number of beats up to the start of the current chunk,
   * used for calculating when a chunk has ended.
   */
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

    /**
     * On last beat, cycle to the next program chunk
     */
    const isLastBeat =
      beatCount.total - offset + values.division ===
      currChunk.measures * currChunk.metre + 1;
    const isFirstBeat =
      beatCount.total - offset === currChunk.measures * currChunk.metre + 1;

    const nextIndex = (currIndex + 1) % routine.length;

    if (isLastBeat && routine[nextIndex].silent !== values.silent) {
      setValues((values) => ({ ...values, silent: routine[nextIndex].silent }));
    }

    if (isFirstBeat) {
      setCurrIndex(nextIndex);
      setOffset((prev) => prev + currChunk.measures * currChunk.metre);
    }
  }, [
    currChunk,
    currIndex,
    routine,
    setValues,
    values,
    beatCount.total,
    values.division,
    offset,
    routine.length,
  ]);

  useEffect(() => {
    if (!isRunning) {
      setCurrIndex(0);
      setOffset(0);
    }
  }, [isRunning]);

  const appendChunk = (chunk: ProgramChunk) => {
    setRoutine((old) => [...old, chunk]);
  };

  const removeChunk = (id: string) => {
    setRoutine((old) => old.filter((chunk) => chunk.id !== id));
  };

  const updateChunk = (id: string, params: Partial<ProgramChunk>) => {
    setRoutine((old) =>
      old.map((chunk) => (chunk.id === id ? { ...chunk, ...params } : chunk))
    );
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

  return { routine, appendChunk, removeChunk, currIndex, reorder, updateChunk };
}
