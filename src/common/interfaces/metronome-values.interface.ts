export interface MetronomeValues {
  /**
   * The tempo given in beats per minute
   */
  tempo: number;

  /**
   * The number of beats per measure
   */
  metre: number;

  /**
   * How frequently to play ticks - 1 = on quarter notes, 0.5 = on 8th notes
   */
  division: 1 | 0.5;

  /**
   * If true, ticks will not be audible
   */
  silent: boolean;
}
