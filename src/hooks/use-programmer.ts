import { useEffect, useMemo, useState } from "react";
import { ProgramChunk } from "../common/interfaces/program-chunk.interface";
import useMetronome from "./use-metronome";

/**
 * useProgrammer manages the creation of custom practice routines
 */

type Routine = ProgramChunk[];

export default function useProgrammer() {
  const { beatCount, setValues, isRunning, values } = useMetronome();
  const [routine, setRoutine] = useState<Routine>([]);

  /**
   * The total number of beats up to the start of the current chunk,
   * used for calculating when a chunk has ended.
   */
  const [offset, setOffset] = useState(0);

  // The index of the current program chunk
  const [currIndex, setCurrIndex] = useState(0);

  const currChunk = useMemo(() => routine[currIndex], [routine, currIndex]);

  const persistRoutine = (updated: Routine) => {
    localStorage.setItem("routine", JSON.stringify(updated));
  };

  useEffect(() => {
    const stored = localStorage.getItem("routine");

    if (stored) {
      setRoutine(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (!currChunk) return;

    const isLastBeat =
      beatCount.total - offset + values.division ===
      currChunk.measures * currChunk.metre + 1;
    const isFirstBeat =
      beatCount.total - offset === currChunk.measures * currChunk.metre + 1;

    const nextIndex = (currIndex + 1) % routine.length;

    // On last beat, anticipate silence setting for the next measure
    if (isLastBeat && routine[nextIndex].silent !== values.silent) {
      const next = routine[nextIndex];
      setValues((values) => ({
        ...values,
        silent: next.silent,
      }));
    }

    // On first beat, update current chunk index
    if (isFirstBeat) {
      const newChunk = routine[nextIndex];
      setValues((prev) => ({
        ...prev,
        tempo: newChunk.tempo,
        metre: newChunk.metre,
        silent: newChunk.silent,
      }));

      setCurrIndex(nextIndex);
      setOffset((prev) => prev + currChunk.measures * currChunk.metre);
    }
  }, [
    currChunk,
    currIndex,
    routine,
    setValues,
    beatCount.total,
    values.division,
    values.silent,
    offset,
    routine.length,
  ]);

  // reset state
  useEffect(() => {
    if (isRunning) return;

    setCurrIndex(0);
    setOffset(0);

    if (routine[0]) {
      const { tempo, metre, silent } = routine[0];
      setValues((prev) => ({ ...prev, tempo, metre, silent }));
    }
  }, [isRunning, setValues, routine]);

  const updateRoutine = (newValue: Routine) => {
    // reflect change in routine order in currently playing routine
    const newIndex = newValue.indexOf(currChunk);

    if (isRunning && newIndex !== currIndex) {
      setCurrIndex(newIndex);
    }

    setRoutine(newValue);
    persistRoutine(newValue);
  };

  return { routine, currIndex, updateRoutine };
}
