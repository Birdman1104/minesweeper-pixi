import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getGameViewGridConfig } from '../configs/gridConfigs/GameViewGC';
import { HeadModelEvents } from '../events/ModelEvents';

export class GameView extends PixiGrid {
    constructor() {
        super();
        this.build();
        lego.event.on(HeadModelEvents.GameModelUpdate, this.gameModelUpdate, this);
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

    private gameModelUpdate(a: any, b: any, c: any): void {
        console.warn(a, b, c);
    }
}
