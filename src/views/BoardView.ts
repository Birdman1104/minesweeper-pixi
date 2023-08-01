import { lego } from '@armathai/lego';
import { Container, Rectangle } from 'pixi.js';
import { CELL_HEIGHT, CELL_WIDTH, COL, OFFSET, ROW } from '../configs/GameConfig';
import { BoardModelEvents, CellModelEvents } from '../events/ModelEvents';
import { CellState } from '../models/CellModel';
import { CellView } from './CellView';

export class BoardView extends Container {
    private cells: CellView[];
    constructor() {
        super();

        this.cells = [];

        lego.event.on(BoardModelEvents.Cells2DUpdate, this.onCells2DUpdate, this);

        lego.event.on(CellModelEvents.StateUpdate, this.onCellStateUpdate, this);
        //
    }

    get name() {
        return 'BoardView';
    }

    destroy() {
        lego.event.off(BoardModelEvents.Cells2DUpdate, this.onCells2DUpdate, this);
        lego.event.off(CellModelEvents.StateUpdate, this.onCellStateUpdate, this);

        super.destroy();
    }

    getBounds() {
        return new Rectangle(0, 0, ROW * (CELL_WIDTH + OFFSET), COL * (CELL_HEIGHT + OFFSET));
    }

    getCellByUuid(uuid: string) {
        return this.cells.find((c) => c.uuid === uuid);
    }

    onCells2DUpdate(cells: any) {
        cells.forEach((col: any, i: number) => {
            col.forEach((cellModel: any, j: number) => {
                const cell = new CellView(cellModel);
                cell.position.set(i * (CELL_WIDTH + OFFSET), j * (CELL_HEIGHT + OFFSET));
                this.cells.push(cell);
                this.addChild(cell);
            });
        });

        // const { width, height } = this.getBounds();
        // const gr = new PIXI.Graphics();
        // gr.beginFill(0xfff111, 0.5);
        // gr.drawRect(0, 0, width, height);
        // gr.endFill();
        // this.addChild(gr);
    }

    onCellStateUpdate(newState: CellState, oldState: CellState, uuid: string) {
        const cell = this.getCellByUuid(uuid) as CellView;
        switch (newState) {
            case CellState.Open:
                cell.reveal();
                break;
            case CellState.Marked:
                cell.mark();
                break;
            case CellState.Closed:
                cell.unmark();
                break;

            default:
                break;
        }
    }
}
