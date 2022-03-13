import {LeanDocument, ObjectId} from 'mongoose';
import {IGameDoc} from "./gameSchema";
import {GAME_CONFIG} from "../lib/config/applicationConfig";
import {ValidationError} from "../lib/error/errorModels";
import {ERROR_MESSAGES} from "../lib/error/errorConstants";

export class Game {
    // Not name _id to prevent type conflict at IGameDoc for _id field. Because it does not accept undefined.
    gameId: ObjectId | undefined;
    // Players that is playing this game.
    players: ObjectId[];
    // Current board representation of game. It includes stones with pits.
    board: IBoard;
    isFinished: boolean;
    // If turnPlayerIndex is 0 then playerOne (players[0]) turn, otherwise playerTwo(player[1]) turn.
    turnPlayerIndex: number;

    /**
     * To create game object from mongoose object.
     * It is necessary to use helper methods. Otherwise, the helper methods won't be provided.
     * @param plainGame mongoose GameSchema object.
     */
    static fromPlainGame(plainGame: LeanDocument<IGameDoc>) {
        const game = new Game(plainGame.players as ObjectId[]);
        game.gameId = plainGame._id;
        game.board = plainGame.board;
        game.isFinished = plainGame.isFinished;
        game.turnPlayerIndex = plainGame.turnPlayerIndex;
        return game;
    }

    /**
     * Constructor of game.
     * @param players Players playing game with.
     * @param pitCount Default pit count is 6.
     * @param stoneCount Default stone count is 6. It can be changed to game by game.
     * @param isFinished If game is finished or not.
     * @param turnPlayerIndex Default first player will start to game. If 1 then second player will start.
     * turnPlayerIndex should be less than player size otherwise will throw ValidationError.
     */
    constructor(players: ObjectId[],
                pitCount = GAME_CONFIG.PIT_COUNT_FOR_EACH_PLAYER,
                stoneCount = GAME_CONFIG.STONE_COUNT_FOR_EACH_PIT,
                isFinished = false, turnPlayerIndex = 0) {

        if(turnPlayerIndex >= players.length) {
            new ValidationError(ERROR_MESSAGES.gamePlayerTurnExceeded)
        }

        this.players = players;
        this.isFinished = isFinished;
        this.turnPlayerIndex = turnPlayerIndex;

        this.board = {
            pits: [new Array(pitCount).fill(stoneCount), new Array(pitCount).fill(stoneCount)],
            homes: [0, 0],
        };
    }

    /**
     * If the game is marked as finished or one of the users' pits are empty,
     * then it should return true otherwise false.
     */
    calculateIsFinished() {
        return this.isFinished || !!this.board.pits.find(pitArr => pitArr.every(item => item === 0));
    }

    /**
     * "The player who still has stones in his/her pits keeps hem and puts them in his/hers Mancala(home)."
     * This function clears stones in pits and adding them to corresponding Mancala.
     */
    finishGame() {
        const activePits = this.getActivePits();
        const opponentPits = this.getOpponentPits();

        this.board.homes[this.turnPlayerIndex] += activePits.reduce((partialSum, pit) => partialSum + pit, 0);
        this.board.homes[this.getOpponentIndex()] += opponentPits.reduce((partialSum, pit) => partialSum + pit, 0);

        this.board.pits[this.turnPlayerIndex] = new Array(activePits.length).fill(0);
        this.board.pits[this.getOpponentIndex()] =  new Array(opponentPits.length).fill(0);
        this.isFinished = true;
    }

    /**
     * The player's ,whose turn it is, own pits.
     */
    getActivePits(): Pit[] {
        return this.board.pits[this.turnPlayerIndex];
    }

    /**
     * The player's(whose turn) opponent pits.
     */
    getOpponentPits(): Pit[] {
        return this.board.pits[this.getOpponentIndex()];
    }

    /**
     * The player's(whose turn) home(Mancala) pit.
     */
    getHomePit(): Pit {
        return this.board.homes[this.turnPlayerIndex];
    }

    /**
     * Set stones to the player's(whose turn) home(Mancala).
     */
    setHomePit(newValue: Pit) {
        this.board.homes[this.turnPlayerIndex] = newValue;
    }

    /**
     * If player1's turn then it will give 1, if player2's turn it will give 0.
     */
    getOpponentIndex() {
        return this.turnPlayerIndex === 1 ? 0 : 1;
    }

    /**
     * It will calculate whose turn then compare with given playerId.
     */
    isPlayersTurn(playerId: ObjectId) {
        return this.players[this.turnPlayerIndex]?.toString() === playerId?.toString();
    }

    /**
     * Changing the game turn to other player.
     */
    changeTurn() {
        this.turnPlayerIndex = this.getOpponentIndex();
    }
}

export type Pit = number;
export interface IBoard {
    pits: Pit[][],          // 0 for first player pits, 1 for second player pits.
    homes: Pit[],           // 0 for first home, 1 for second player home.
}

