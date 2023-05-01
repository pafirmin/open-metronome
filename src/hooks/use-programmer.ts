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

  // When metronome is stopped, reset values to the first chunk of the routine
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
  }, [isRunning]);

  const updateRoutine = (newValue: Routine) => {
    setRoutine(newValue);
    persistRoutine(newValue);

    // reflect change in routine order in currently playing routine
    const newIndex = newValue.indexOf(currChunk);

    if (isRunning && newIndex !== currIndex) {
      setCurrIndex(newIndex);
    }
  };

  return { routine, currIndex, updateRoutine };
}
