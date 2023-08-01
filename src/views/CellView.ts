import { lego } from '@armathai/lego';
import { gsap } from 'gsap';
import { Container, Rectangle, Sprite, Text } from 'pixi.js';
import { CELL_HEIGHT, CELL_WIDTH, CellBgTint } from '../configs/GameConfig';
import { BoardViewEvent } from '../events/MainEvents';
import { CellType } from '../models/CellModel';

export class CellView extends Container {
    private config: any;
    private _type: CellType;
    private _neighborCount: number;
    private _uuid: string;
    private mine: Sprite;
    private flag: Sprite;
    private cover: Sprite;
    private bg: Sprite;
    private label: Text;

    public constructor(config: any) {
        super();

        this.config = config;
        this._type = config.type;
        this._neighborCount = config.neighborCount;
        this._uuid = config.uuid;

        this.build();
    }

    get name() {
        return 'CellView';
    }

    get type() {
        return this._type;
    }

    get uuid() {
        return this._uuid;
    }

    get neighborCount() {
        return this._neighborCount;
    }

    public getBounds(): Rectangle {
        return new Rectangle(0, 0, CELL_WIDTH, CELL_HEIGHT);
    }

    public reveal(): void {
        this.mine && this.flag && this.flag.destroy();
        gsap.to(this.cover.scale, { x: 0, duration: 0.2, ease: Linear.easeNone });
        this.mine &&
            gsap.to(this.mine.scale, { x: 1, y: 1, duration: 0.5, ease: Sine.easeInOut, repeat: -1, yoyo: true });
    }

    mark() {
        this.flag.alpha = 1;
        // this._hint && (this._hint.alpha = 1);
    }

    unmark() {
        this.flag && (this.flag.alpha = 0);
        // this._hint && (this._hint.alpha = 0);
    }

    build() {
        this._buildBg();
        this._type === CellType.Number ? this._buildNumber() : this._buildMine();
        this._buildCover();
        this._type === CellType.Number && this._buildWrong();
        this._buildFlag();
    }

    _buildBg() {
        const bg = Sprite.from('cell.png');
        bg.anchor.set(0);
        console.warn(this._type);

        const tint = 0xff0000;
        // const tint = this._type === CellType.Mine ? CellBgTint[this._type] : CellBgTint[this._neighborCount];
        bg.tint = tint;
        this.addChild((this.bg = bg));
    }

    _buildCover() {
        const cover = Sprite.from('cell.png');
        cover.anchor.set(0);
        cover.tint = CellBgTint[10];
        cover.eventMode = 'static';
        cover.on('pointerdown', () => lego.event.emit(BoardViewEvent.CellClicked, this._uuid));
        this.addChild((this.cover = cover));
    }

    _buildWrong() {
        // const hint = makeSprite(getCellSpriteConfig(0xe09775));
        // hint.anchor.set(0);
        // hint.alpha = 0;
        // this.addChild((this._hint = hint));
    }

    _buildNumber() {
        if (this._neighborCount === 0) {
            return;
        }
        // const label = makeText(getCellTextConfig(this._neighborCount));
        // label.anchor.set(0.5);
        // label.position.set(this.bg.width / 2, this.bg.height / 2);
        // this.addChild((this._label = label));
    }

    _buildMine() {
        const mine = Sprite.from('game/mine.png');
        mine.anchor.set(0.5);
        mine.scale.set(0.8);
        mine.position.set(this.bg.width / 2, this.bg.height / 2);
        this.addChild((this.mine = mine));
    }

    _buildFlag() {
        const flag = Sprite.from('flag.png');
        flag.anchor.set(0.5);
        flag.scale.set(0.8);
        flag.alpha = 0;
        flag.position.set(this.bg.width / 2, this.bg.height / 2);
        this.addChild((this.flag = flag));
    }
}
