import {ISowState} from "./sowStateModels";
import {Game, Pit} from "../../game/gameModels";
import {MancalaPitState} from "./mancalaPitState";
import {ValidationError} from "../../lib/error/errorModels";
import {ERROR_MESSAGES} from "../../lib/error/errorConstants";

/**
 * To iterate over active player's state pit(s) and in order to calculate last stone landed in own pit rules.
 */
export class OwnPitState implements ISowState {
    private readonly game: Game;
    private currentIndex: number;
    private readonly pits: Pit[];

    constructor(game: Game, currentIndex = 0) {
        this.game = game;
        this.pits = game.getActivePits();
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
     * It will go right. If finished, then will be changed to Mancala.
     * @param onNewState If the new area should be passed, then it will call onNewState callback to change it.
     */
    goNext(onNewState: (newState: ISowState) => void) {
        if (this.currentIndex >= (this.pits.length - 1)) {
            // If current area pits is finished. Then it will go to player home pit.
            return onNewState(new MancalaPitState(this.game));
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
     * This function calculates rules for situtations that last stone landed in own pit.
     * If the last stone landed in empty pit, capture this stone and all opposite pit stones, and put it to players home.
     */
    onRunOutOfStones() {
        const game = this.game;
        const activePits = game.getActivePits();
        // Last stone not landed in empty pit.
        if(activePits[this.currentIndex] !== 1) {
            return game.changeTurn();
        }

        // Last stone landed in empty pit.
        // Capture this stone and all opposite pit stones, and put it to players home.
        const opponentPits = game.getOpponentPits();
        game.setHomePit(game.getHomePit() + opponentPits[this.currentIndex] + activePits[this.currentIndex]);
        activePits[this.currentIndex] = 0;
        opponentPits[this.currentIndex] = 0;
        game.changeTurn();
    };

    /**
     * Set stone count for current pit.
     */
    setCurrentStones(newPit: Pit) {
        this.pits[this.currentIndex] = newPit;
    }
}