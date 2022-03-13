import {ISowState} from "./sowStateModels";
import {Game, Pit} from "../../game/gameModels";
import {OwnPitState} from "./ownPitState";
import {BusinessError, ValidationError} from "../../lib/error/errorModels";
import {ERROR_MESSAGES} from "../../lib/error/errorConstants";

/**
 * To iterate over opponent side pit(s). And calculating last stone landed rules for opponent pit.
 */
export class OpponentPitState implements ISowState {
    private currentIndex: number;
    private readonly game: Game;
    private readonly pits: Pit[];

    constructor(game: Game, currentIndex = 0) {
        this.game = game;
        this.pits = game.getOpponentPits();
        // If the pit is not valid and exceeds the pit array, then it will throw exception.
        if (currentIndex >= this.pits.length) {
            throw new ValidationError(ERROR_MESSAGES.moveInvalid);
        }
        this.currentIndex = currentIndex;
    }

    /**
     * Adding stones to current pit. Generally 1 stone.
     * @param stone That will be added to current pit.
     */
    add(stone: number) {
        this.pits[this.currentIndex] += stone;
    }

    /**
     * It will go right. If finished, then will be changed to active player's own pit area.
     * @param onNewState If the new area should be passed, then it will call onNewState callback to change it.
     */
    goNext(onNewState: (newState: ISowState) => void) {
        if (this.currentIndex >= (this.pits.length - 1)) {
            // After opponent side is finished. It will move on to active side again.
            return onNewState(new OwnPitState(this.game));
        }
        this.currentIndex++;
    }

    /**
     * Get current stone numnber.
     */
    getCurrentPit() {
        return this.pits[this.currentIndex];
    }

    /**
     * Set stone count for current pit.
     */
    setCurrentStones(newPit: Pit) {
        this.pits[this.currentIndex] = newPit;
    }

    /**
     * Last stone landed in one of the opponent side pit.
     * Change turn of the game.
     */
    onRunOutOfStones = () => {
        this.game.changeTurn();
    };
}