import { ObservableModel } from './ObservableModel';

export enum CellState {
    Unknown,
    Closed,
    Open,
    Marked,
}

export enum CellType {
    Unknown,
    Mine,
    Number,
}

export class CellModel extends ObservableModel {
    private _state: CellState;
    private _neighborCount: number = -100;

    public constructor(private _i: number, private _j: number, private _type: CellType) {
        super('CellModel');

        this._state = CellState.Closed;
        this.makeObservable();
    }

    get state() {
        return this._state;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get neighborCount() {
        return this._neighborCount;
    }

    set neighborCount(value) {
        this._neighborCount = value;
    }

    get i() {
        return this._i;
    }

    get j() {
        return this._j;
    }

    set state(value) {
        this._state = value;
    }
}
