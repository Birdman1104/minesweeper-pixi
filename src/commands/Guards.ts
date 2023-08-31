import { IconType } from '../models/BoardModel';
import Head from '../models/HeadModel';

export const isFlagGuard = () => {
    return Head.gameModel.board.iconType === IconType.Flag;
};

export const areValuesSet = () => {
    console.warn(Head.gameModel.board.valuesSet);

    return Head.gameModel.board.valuesSet;
};
