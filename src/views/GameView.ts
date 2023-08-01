import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getGameViewGridConfig } from '../configs/gridConfigs/GameViewGC';
import { GameModelEvents } from '../events/ModelEvents';
import { BoardView } from './BoardView';

export class GameView extends PixiGrid {
    private board: BoardView | null;
    constructor() {
        super();
        this.build();
        lego.event.on(GameModelEvents.BoardUpdate, this.onBoardUpdate, this);
    }

    public getGridConfig(): ICellConfig {
        return getGameViewGridConfig();
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        //
    }

    private onBoardUpdate(board: any): void {
        board ? this.buildBoard() : this.destroyBoard();
    }

    buildBoard() {
        const board = new BoardView();
        this.setChild('board', (this.board = board));
    }

    destroyBoard() {
        if (this.board) {
            this.board.destroy();
            this.board = null;
        }
    }
}
