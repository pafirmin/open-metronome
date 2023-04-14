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
  const metronome = useMetronome();
  const [routine, setRoutine] = useState<ProgramChunk[]>([]);

  // The index of the current program chunk
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    // When currIndex changes, set metronome values to new chunk settings
    const currChunk = routine[currIndex];

    metronome.setValues((prev) => ({
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
    if (currChunk.metre * currChunk.measures === metronome.beatCount) {
      setCurrIndex((currIndex + 1) % routine.length);
    }
  }, [metronome.beatCount]);

  const addChunk = (chunk: ProgramChunk) => {
    setRoutine((old) => [...old, chunk]);
  };

  const removeChunk = (index: number) => {
    setRoutine((old) => old.filter((_, i) => i !== index));
  };
}
