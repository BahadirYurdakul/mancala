import {Game} from "../../game/gameModels";
import {OwnPitState} from "./ownPitState";
import {ISowState} from "./sowStateModels";
import {BusinessError} from "../../lib/error/errorModels";
import {ERROR_MESSAGES} from "../../lib/error/errorConstants";

/**
 * State container when sowing the stones.
 */
export class SowStateContainer {
    private game: Game;
    currentState: ISowState;

    constructor(game: Game, fromIndex: number) {
        this.game = game;
        // Movement start from one of the player own pits.
        this.currentState = new OwnPitState(game, fromIndex);
        this.setState = this.setState.bind(this);
    }

    /**
     * To set new state. Change if you passed another pit kind. (own pit, Mancala, opponent pit)
     */
    private setState(newState: ISowState) {
        this.currentState = newState;
    }

    /**
     * Make players move by first take stones from current pit.
     * Then skip one by one and sow stones. Current state stores last stone lands on which area.
     */
    makeMove() {
        // Take stones from selected pit.
        let stones = this.currentState.getCurrentPit();
        this.currentState.setCurrentStones(0);

        if(stones === 0) {
            // If there is no stone player cannot select this pit.
            throw new BusinessError(ERROR_MESSAGES.moveInvalid);
        }

        // When there is still stone in your hand continue sowing.
        while(stones > 0) {
            // First go next then add 1 stone.
            // If you change order of goNext and add, then it will start from selected pit to put stones.
            this.currentState.goNext(this.setState);
            this.currentState.add(1);
            stones--;
        }
        // Stones in hand is finished.
        // Apply stones run out of rules by last state.
        this.currentState.onRunOutOfStones();
        // If the game should be finished calculate points and finish the game.
        this.game.calculateIsFinished() && this.game.finishGame();
    }
}
