import { COL, NUM_OF_MINES, ROW } from '../configs/GameConfig';
import { CellModel, CellState, CellType } from './CellModel';
import { ObservableModel } from './ObservableModel';

export enum BoardState {
    Unknown,
    Game,
    Lose,
    Win,
}

export enum IconType {
    Flag,
    Mine,
    Unknown,
}

export class BoardModel extends ObservableModel {
    private _state: BoardState = BoardState.Unknown;
    private _cells2D: CellModel[][];
    private _iconType: IconType = IconType.Unknown;
    private _numOfFlags = -1;
    private _checkedCells = 0;
    private _rightMarks = 0;
    private _valuesSet = false;

    public constructor() {
        super('BoardModel');

        this._checkedCells = 0;
        this._rightMarks = 0;

        this.makeObservable();
    }

    get numOfFlags() {
        return this._numOfFlags;
    }

    set numOfFlags(value) {
        this._numOfFlags = value;
    }

    get rightMarks() {
        return this._rightMarks;
    }

    set rightMarks(value) {
        this._rightMarks = value;
    }

    get iconType() {
        return this._iconType;
    }

    set iconType(value) {
        this._iconType = value;
    }

    get checkedCells() {
        return this._checkedCells;
    }

    set checkedCells(value) {
        this._checkedCells = value;
    }

    get state() {
        return this._state;
    }

    set state(value) {
        this._state = value;
    }

    get cells2D() {
        return this._cells2D;
    }

    set cells2D(value) {
        this._cells2D = value;
    }

    get valuesSet() {
        return this._valuesSet;
    }

    public init(): void {
        this.initCells2D();
        this._numOfFlags = 0;
        this._iconType = IconType.Mine;
        this._state = BoardState.Game;
    }

    public increaseFlagCount(): void {
        this._numOfFlags += 1;
    }

    public decreaseFlagCount(): void {
        this._numOfFlags -= 1;
    }

    public increaseRightMarksCount(): void {
        this._rightMarks += 1;
    }

    public decreaseRightMarksCount(): void {
        this._rightMarks -= 1;
    }

    public getCellByUuid(uuid: string): CellModel | null {
        let cell = null;
        for (let i = 0; i < this._cells2D.length; i++) {
            for (let j = 0; j < this._cells2D[i].length; j++) {
                if (this._cells2D[i][j].uuid === uuid) {
                    cell = this._cells2D[i][j];
                    break;
                }
            }
        }
        return cell;
    }

    public initCellsValues(): void {
        this._valuesSet = true;
        this.setMines(NUM_OF_MINES, this._cells2D);
        this.setNumbers(this._cells2D);
        this.setCounters(this._cells2D);
    }

    public revealAll(): void {
        for (let i = 0; i < this._cells2D.length; i++) {
            for (let j = 0; j < this._cells2D[i].length; j++) {
                const cell = this._cells2D[i][j];
                // @ts-ignore
                if (cell.state !== CellState.Open || cell.state !== CellState.Marked) {
                    cell.state = CellState.Open;
                }
            }
        }
    }

    public revealCell(uuid: string): void {
        const cell = this.getCellByUuid(uuid) as CellModel;
        if (cell.state !== CellState.Marked) {
            cell.state = CellState.Open;

            if (!cell.neighborCount) {
                this.openNeighbors(cell);
            }
        }
    }

    private openNeighbors(cell: CellModel): void {
        for (let xoff = -1; xoff <= 1; xoff++) {
            for (let yoff = -1; yoff <= 1; yoff++) {
                let i = cell.i + xoff;
                let j = cell.j + yoff;

                if (i > -1 && i < COL && j > -1 && j < ROW) {
                    let neighbor = this._cells2D[i][j];
                    if (neighbor.state !== CellState.Open && neighbor.type === CellType.Number) {
                        this.revealCell(neighbor.uuid);
                    }
                }
            }
        }
    }

    private initCells2D(): void {
        this._cells2D = this.get2DArray(COL, ROW);
    }

    private get2DArray(cols: number, rows: number) {
        let arr = getEmptyArr(cols, rows);

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const cell = new CellModel(i, j, CellType.Unknown);
                arr[i][j] = cell;
            }
        }

        return arr;
    }

    private setMines(cnt: number, board: CellModel[][]): void {
        for (let n = 0; n < cnt; n++) {
            this.putMine(board);
        }
    }

    private setNumbers(board: CellModel[][]): void {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const cell = board[i][j];
                if (cell.type !== CellType.Mine) {
                    cell.type = CellType.Number;
                }
            }
        }
    }

    private putMine(board: CellModel[][]): void {
        let i = Math.floor(Math.random() * board.length);
        let j = Math.floor(Math.random() * board[0].length);
        const cell = board[i][j];

        if (cell.type !== CellType.Mine) {
            cell.type = CellType.Mine;
        } else {
            this.putMine(board);
        }
    }

    private setCounters(arr: CellModel[][]): void {
        arr.forEach((col) => {
            col.forEach((cell) => {
                this.countMines(cell, arr);
            });
        });
    }

    private countMines(cell: CellModel, arr: CellModel[][]): void {
        if (cell.type === CellType.Mine) {
            // cell.neighborCount = -1;
            return;
        }

        let total = 0;

        for (let xoff = -1; xoff <= 1; xoff++) {
            for (let yoff = -1; yoff <= 1; yoff++) {
                let i = cell.i + xoff;
                let j = cell.j + yoff;

                if (i > -1 && i < COL && j > -1 && j < ROW) {
                    let neighbor = arr[i][j];
                    if (neighbor.type === CellType.Mine) {
                        total++;
                    }
                }
            }
        }

        cell.neighborCount = total;
    }
}

export const getEmptyArr = (cols: number, rows: number) => {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
};
