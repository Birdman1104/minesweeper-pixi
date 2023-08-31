import { lego } from '@armathai/lego';
import { areValuesSet } from '../commands/Guards';
import { GameEvents, MainGameEvents } from '../events/MainEvents';
import Head from '../models/HeadModel';

export const mapCommands = () => {
    eventCommandPairs.forEach(({ event, command }) => {
        lego.event.on(event, command);
    });
};

export const unMapCommands = () => {
    eventCommandPairs.forEach(({ event, command }) => {
        lego.event.off(event, command);
    });
};

const onMainViewReadyCommand = () => {
    Head.init();
};

const initCellValuesCommand = () => {
    Head.gameModel.board.initCellsValues();
};

const onCellClickCommand = (cellID: string) => {
    lego.command.guard(areValuesSet).execute(openCellCommand).execute(initCellValuesCommand);
    // lego.command
    //     .guard(isFlagGuard)
    //     .payload(cellID)
    //     .execute(() => {
    //         console.warn('flag checker actions');
    //     })
    //     .payload(cellID)
    //     .execute(openCellCommand);
    // Head.gameModel.board.cellClick();
};

const openCellCommand = () => {
    lego.command.execute(() => {
        console.warn('open cell');
    });
};

const eventCommandPairs = Object.freeze([
    {
        event: MainGameEvents.MainViewReady,
        command: onMainViewReadyCommand,
    },
    {
        event: GameEvents.CellClicked,
        command: onCellClickCommand,
    },
]);
