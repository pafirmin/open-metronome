type TickerCallback = (t: Ticker) => void;

type OnTickCallback = (currBeat: number) => void;

export type Division = 0.5 | 1;

interface TickerConfig {
  tempo?: number;
  metre?: number;
  division?: Division;
  onTick?: OnTickCallback;
  onInit?: TickerCallback;
  onReset?: TickerCallback;
}

export interface TickerOptions {
  /* tempo: the tempo in beats per minute. */
  tempo: number;

  /* metre: the number of beats per measure. */
  metre: number;

  /***
   * division: determines which note values should cause a tick
   * to be played. 1 = tick on quarter notes, 0.5 = tick on eighth notes.
   */
  division: Division;

  /* silent: if true, ticks will not be audible. */
  silent: boolean;
}

export default class Ticker {
  private currBeat = 1;
  private isRunning = false;
  private silent = false;
  private tempo: number;
  private metre: number;
  private division: Division;
  private gainNode: GainNode;
  private onTickCb: OnTickCallback | undefined;
  private onInitCb: TickerCallback | undefined;
  private onResetCb: TickerCallback | undefined;
  private static readonly PULSE_LENGTH = 0.1;

  constructor(private readonly ctx: AudioContext, config?: TickerConfig) {
    this.metre = config?.metre ?? 4;
    this.tempo = config?.tempo ?? 120;
    this.division = config?.division ?? 1;
    this.onTickCb = config?.onTick;
    this.onInitCb = config?.onInit;
    this.gainNode = ctx.createGain();
    this.gainNode.gain.value = 0.1;
  }

  public init() {
    this.isRunning = true;
    this.gainNode.connect(this.ctx.destination);
    this.currBeat = 1;

    if (typeof this.onInitCb === "function") {
      this.onInitCb(this);
    }

    this.pulse(this.ctx.currentTime);
  }

  public setValues({ tempo, metre, division, silent }: TickerOptions) {
    this.tempo = tempo;
    this.metre = metre;
    this.division = division;
    this.silent = silent;
  }

  public reset() {
    this.isRunning = false;
    this.currBeat = 1;
    this.gainNode.disconnect();

    if (typeof this.onResetCb === "function") {
      this.onResetCb(this);
    }
  }

  public onTick(cb: OnTickCallback) {
    this.onTickCb = cb;
  }

  public onInit(cb: TickerCallback) {
    this.onInitCb = cb;
  }

  public onReset(cb: TickerCallback) {
    this.onResetCb = cb;
  }

  private async pulse(nextNoteTime: number) {
    if (this.isRunning) {
      this.nextNoteTime += (60.0 / this.tempo) * this.division;

      await this.playTick(nextNoteTime);

      if (typeof this.onTickCb === "function") {
        this.onTickCb(this.currBeat);
      }

      this.currBeat = this.currBeat === this.metre ? 1 : this.currBeat + this.division;

      this.pulse((nextNoteTime + 60 / this.tempo) * this.division)
    }
  }

  private playTick(time: number) {
    return new Promise<void>((resolve) => {
      const oscillator = this.ctx.createOscillator();
      oscillator.connect(this.gainNode);
      oscillator.frequency.value = this.getFrequency();
      oscillator.start(time);
      oscillator.stop(time + Ticker.PULSE_LENGTH);
      oscillator.onended = () => resolve()
    });
  }

  private getFrequency() {
    if (this.silent) {
      return 0;
    } else if (this.currBeat === 1) {
      return 550;
    } else if (Number.isInteger(this.currBeat)) {
      return 450;
    } else {
      return 375;
    }
  }
}
