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
  private currBeat: number = 1;
  private isRunning: boolean = false;
  private silent: boolean = false;
  private tempo: number;
  private metre: number;
  private division: Division;
  private nextNoteTime: number = 0;
  private gainNode: GainNode;
  private onTickCb: OnTickCallback | undefined;
  private onInitCb: TickerCallback | undefined;
  private onResetCb: TickerCallback | undefined;

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
    this.nextNoteTime = this.ctx.currentTime;
    this.currBeat = 1;

    if (typeof this.onInitCb === "function") {
      this.onInitCb(this);
    }

    this.pulse();
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

  private pulse() {
    if (this.isRunning) {
      this.nextNoteTime += (60.0 / this.tempo) * this.division;
      this.playTick();
      this.currBeat =
        this.currBeat === this.metre ? 1 : this.currBeat + this.division;
    }
  }

  private playTick() {
    const oscillator = this.ctx.createOscillator();
    oscillator.connect(this.gainNode);
    oscillator.frequency.value = this.getFrequency();
    oscillator.start(this.nextNoteTime);
    oscillator.stop(this.nextNoteTime + 0.1);
    oscillator.onended = this.pulse.bind(this);
    if (typeof this.onTickCb === "function") {
      this.onTickCb(this.currBeat);
    }
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
