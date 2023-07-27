export const BoardModelEvents = {
    NumOfFlagsUpdate: 'BoardModelNumOfFlagsUpdate',
    RightMarksUpdate: 'BoardModelRightMarksUpdate',
    CheckerUpdate: 'BoardModelCheckerUpdate',
    CheckedCellsUpdate: 'BoardModelCheckedCellsUpdate',
    StateUpdate: 'BoardModelStateUpdate',
};

export const CellModelEvents = {
    TypeUpdate: 'CellModelTypeUpdate',
    NeighborCountUpdate: 'CellModelNeighborCountUpdate',
    StateUpdate: 'CellModelStateUpdate',
};

export const GameModelEvents = {
    BoardUpdate: 'GameModelBoardUpdate',
    TimerUpdate: 'GameModelTimerUpdate',
    StateUpdate: 'GameModelStateUpdate',
};

export const HeadModelEvents = { GameModelUpdate: 'HeadModelGameModelUpdate' };
