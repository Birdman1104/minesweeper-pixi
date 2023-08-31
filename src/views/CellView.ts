import { lego } from '@armathai/lego';
import { gsap } from 'gsap';
import { Container, Rectangle, Sprite, Text } from 'pixi.js';
import { CELL_HEIGHT, CELL_WIDTH, CellBgTint } from '../configs/GameConfig';
import { GameEvents } from '../events/MainEvents';
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

    public updateNeighborsCount(value: number): void {
        this.removeChild(this.cover);
        this.addChild(this.cover);
        this.cover.tint = 0xff0000;

        if (value <= 0) return;
        this._neighborCount = value;
        this.buildNumber();
    }

    public reveal(): void {
        this.mine && this.flag && this.flag.destroy();
        gsap.to(this.cover.scale, { x: 0, duration: 0.2, ease: Linear.easeNone });
        this.mine &&
            gsap.to(this.mine.scale, { x: 1, y: 1, duration: 0.5, ease: Sine.easeInOut, repeat: -1, yoyo: true });
    }

    public mark(): void {
        this.flag.alpha = 1;
        // this._hint && (this._hint.alpha = 1);
    }

    public unmark(): void {
        this.flag && (this.flag.alpha = 0);
        // this._hint && (this._hint.alpha = 0);
    }

    public build(): void {
        this.buildBg();
        this.buildCover();
    }

    public updateType(type: CellType): void {
        this._type = type;
        this._type === CellType.Mine && this.buildMine();
    }

    private buildBg(): void {
        const bg = Sprite.from('cell.png');
        bg.anchor.set(0);
        const tint = 0xffffff;
        // const tint = this._type === CellType.Mine ? CellBgTint[this._type] : CellBgTint[this._neighborCount];
        bg.tint = tint;
        this.addChild((this.bg = bg));
    }

    private buildCover(): void {
        const cover = Sprite.from('cell.png');
        cover.anchor.set(0);
        cover.tint = CellBgTint[10];
        cover.eventMode = 'static';
        cover.on('pointerdown', () => lego.event.emit(GameEvents.CellClicked, this._uuid));
        cover.alpha = 0.3;
        this.addChild((this.cover = cover));
    }

    private buildWrong(): void {
        // const hint = makeSprite(getCellSpriteConfig(0xe09775));
        // hint.anchor.set(0);
        // hint.alpha = 0;
        // this.addChild((this._hint = hint));
    }

    private buildNumber(): void {
        if (this._neighborCount <= 0) {
            return;
        }
        console.warn(`INIT TEXT`);

        const label = new Text(`${this._neighborCount}`, {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0x000000,
            align: 'center',
        });
        label.anchor.set(0.5);
        label.position.set(this.bg.width / 2, this.bg.height / 2);
        this.addChild((this.label = label));
    }

    private buildMine(): void {
        const mine = Sprite.from('mine.png');
        mine.anchor.set(0.5);
        mine.scale.set(0.8);
        mine.position.set(this.bg.width / 2, this.bg.height / 2);
        this.addChild((this.mine = mine));
    }

    private buildFlag(): void {
        const flag = Sprite.from('flag.png');
        flag.anchor.set(0.5);
        flag.scale.set(0.8);
        flag.alpha = 0;
        flag.position.set(this.bg.width / 2, this.bg.height / 2);
        this.addChild((this.flag = flag));
    }
}
