import {Pit} from "../../game/gameModels";

/**
 * State iterator model for pits.
 */
export interface ISowState {
    add: (stone: number) => void;
    goNext: (onNewState: (newState: ISowState) => void) => void;
    onRunOutOfStones: () => void;
    getCurrentPit: () => Pit;
    setCurrentStones: (newPit: Pit) => void;
}