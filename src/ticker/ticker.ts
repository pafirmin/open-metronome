interface TickerConfig {
  tempo?: number;
  metre?: number;
  division?: number;
  onTick?: (self: Ticker) => void;
}

type OnTickFn = (t: Ticker) => void;

export default class Ticker {
  public isRunning: boolean = false;
  public currBeat: number = 0;
  public silent: boolean = false;
  public tempo: number;
  public metre: number;
  public division: number;
  private nextNoteTime: number = 0;
  private gainNode: GainNode;
  private interval: number | undefined;
  private onTickCb: OnTickFn | undefined;

  constructor(private readonly ctx: AudioContext, config?: TickerConfig) {
    this.metre = config?.metre ?? 4;
    this.tempo = config?.tempo ?? 120;
    this.division = config?.division ?? 1;
    this.onTickCb = config?.onTick;
    this.gainNode = ctx.createGain();
    this.gainNode.gain.value = 0.1;
  }

  public init() {
    this.isRunning = true;
    this.currBeat = 0;
    this.gainNode.connect(this.ctx.destination);
    this.nextNoteTime = this.ctx.currentTime;
    this.pulse();
  }

  public reset() {
    this.isRunning = false;
    clearInterval(this.interval);
    this.currBeat = 0;
  }

  public onTick(cb: OnTickFn) {
    this.onTickCb = cb;
  }

  private pulse() {
    if (this.isRunning) {
      this.nextNoteTime += (60.0 / this.tempo) * this.division;
      this.playTick();
      this.currBeat =
        this.currBeat + this.division === this.metre
          ? 0
          : this.currBeat + this.division;
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
      this.onTickCb(this);
    }
  }

  private getFrequency() {
    if (this.currBeat === 0) {
      return 550;
    } else if (Number.isInteger(this.currBeat)) {
      return 450;
    } else {
      return 375;
    }
  }
}
