import {Game, Pit} from "../../game/gameModels";
import {ISowState} from "./sowStateModels";
import {OpponentPitState} from "./opponentPitState";

/**
 * To iterate over active player home state pit(s). And calculating new state.
 */
export class MancalaPitState implements ISowState {
    private readonly game: Game;

    constructor(game: Game) {
        this.game = game;
    }

    // Add stones to players home.
    add(stone: number) {
        this.game.setHomePit(this.getCurrentPit() + stone);
    }

    /**
     * It will change to opponent side after home pit.
     * @param onNewState newState will be called as opponent area.
     */
    goNext(onNewState: (newState: ISowState) => void) {
        onNewState(new OpponentPitState(this.game));
    }

    // Get players' mancala(home) stone count.
    getCurrentPit() {
        return this.game.getHomePit();
    }

    /**
     * Set stone count for current pit.
     */
    setCurrentStones(newPit: Pit) {
        this.game.setHomePit(newPit);
    }

    /**
     * Last stone landed in home pit. As rule says do not change turn!
     */
    onRunOutOfStones = () => {};
}