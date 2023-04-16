/***
 * A ProgramChunk represents one portion of a custom practice routine
 */

export interface ProgramChunk {
  id: string;
  tempo: number;
  measures: number;
  metre: number;
  silent: boolean;
}
