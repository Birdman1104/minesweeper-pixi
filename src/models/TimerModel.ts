import { ObservableModel } from './ObservableModel';

export class TimerModel extends ObservableModel {
    private _delta: number;
    private _time = 0;
    private _timeInMs = 0;

    public constructor() {
        super('TimerModel');

        this._delta = window.game.ticker.deltaMS;

        this.makeObservable();
    }

    get time() {
        return this._time;
    }

    public startTimer(): void {
        window.game.ticker.add(this._increase, this);
    }

    public stopTimer(): void {
        window.game.ticker.remove(this._increase, this);
    }

    _increase(): void {
        this._timeInMs += this._delta;
        this._time = Math.floor(this._timeInMs / 1000);
    }
}
