export const BoardModelEvents = {
    NumOfFlagsUpdate: 'BoardModelNumOfFlagsUpdate',
    RightMarksUpdate: 'BoardModelRightMarksUpdate',
    IconTypeUpdate: 'BoardModelIconTypeUpdate',
    CheckedCellsUpdate: 'BoardModelCheckedCellsUpdate',
    StateUpdate: 'BoardModelStateUpdate',
    Cells2DUpdate: 'BoardModelCells2DUpdate',
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
