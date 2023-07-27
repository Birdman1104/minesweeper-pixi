import { BoardModel } from './BoardModel';
import { ObservableModel } from './ObservableModel';
import { TimerModel } from './TimerModel';

export enum GameState {
    Unknown,
}

export class GameModel extends ObservableModel {
    private _state: GameState;
    private _board: BoardModel | null;
    private _timer: TimerModel | null;

    constructor() {
        super('GameModel');

        this._state = GameState.Unknown;
        this.makeObservable();
    }

    get board(): BoardModel {
        return this._board as BoardModel;
    }

    set board(board: BoardModel) {
        this._board = board;
    }

    get timer(): TimerModel {
        return this._timer as TimerModel;
    }

    set timer(timer: TimerModel) {
        this._timer = timer;
    }

    get state(): GameState {
        return this._state;
    }

    set state(value: GameState) {
        this._state = value;
    }

    public init(): void {
        this.initBoard();
        this.initTimer();
    }

    private initBoard(): void {
        this._board = new BoardModel();
        this._board.init();
    }

    private initTimer(): void {
        this._timer = new TimerModel();
    }

    public destroyBoard(): void {
        (this._board as BoardModel).destroy();
        this._board = null;
    }

    public destroyTimer(): void {
        (this._timer as TimerModel).destroy();
        this._timer = null;
    }
}
