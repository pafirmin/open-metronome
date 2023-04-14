/***
 * A ProgramChunk represents one portion of a custom practice routine
 */

export interface ProgramChunk {
  tempo: number;
  measures: number;
  metre: number;
  silent: boolean;
}
