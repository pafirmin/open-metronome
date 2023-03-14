interface TickerConfig {
  tempo?: number;
  metre?: number;
  division?: number;
  onTick?: (self: Ticker) => void;
}

type OnTickFn = (t: Ticker) => void

export default class Ticker {
  public isRunning: boolean = false;
  public currBeat: number = 1;
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
    this.gainNode.gain.value = 0.2;
  }

  public init() {
    this.isRunning = true;
    this.currBeat = 1;
    this.gainNode.connect(this.ctx.destination);
    this.nextNoteTime = this.ctx.currentTime + 0.1;
    this.startPulse();
  }

  public reset() {
    this.isRunning = false;
    clearInterval(this.interval);
    this.currBeat = 1;
  }

  public onTick(cb: OnTickFn) {
    this.onTickCb = cb
  }

  private startPulse() {
    this.interval = setInterval(() => this.queuePulse(), 100);
  }

  private queuePulse() {
    if (this.nextNoteTime < this.ctx.currentTime + 0.2) {
      if (!this.silent) {
        this.playTick();
      }
      this.nextNoteTime += (60.0 / this.tempo) * this.division;
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
    if (typeof this.onTickCb === "function") {
      this.onTickCb(this);
    }
  }

  private getFrequency() {
    if (this.currBeat === 1) {
      return 550;
    } else if (Number.isInteger(this.currBeat)) {
      return 450;
    } else {
      return 350;
    }
  }
}
