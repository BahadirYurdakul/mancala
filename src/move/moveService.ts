import {IMove} from "./moveModels";
import mongoose, {ObjectId, startSession} from "mongoose";
import {Game} from "../game/gameModels";
import {findGameById, updateGameById} from "../game/gameService";
import {BusinessError, ValidationError} from "../lib/error/errorModels";
import {ERROR_MESSAGES} from "../lib/error/errorConstants";
import {SowStateContainer} from "./sowStoneStates/sowStateContainer";
import {IMoveDoc, MoveDoc} from "./moveSchema";

/**
 * This function checks if the given move is valid and corresponding game is valid and playable.
 * Then it calculates the new state of game and save updated game and created move to db.
 * @param move Object that represents player move. fromPitNumber in it starts from 1 not 0!.
 */
export async function playMove(move: IMove): Promise<{ game: Game, move: IMove }> {
    // To prevent inconsistencies that might occur between Game and Move documents transaction started.
    const session = await startSession();
    session.startTransaction();
    try {
        const gameDoc = await findGameById(move._game);
        const game = (gameDoc ? Game.fromPlainGame(gameDoc.toObject()) : undefined) as Game;
        checkMoveValid(game, move._player);

        new SowStateContainer(game as Game, move.fromPitNumber - 1).makeMove();
        await updateGameById(game.gameId as ObjectId, game, session);
        const savedMove = await saveMove(move, session);
        await session.commitTransaction();
        return {game, move: savedMove};
    } catch (err) {
        await session.abortTransaction();
        throw err;
    }
}

export async function saveMove(move: IMove, session?: any) {
    return await new MoveDoc(move).save({ session });
}

export async function findMoveById(id: string, session?: any): Promise<IMoveDoc | null> {
    return MoveDoc.findById(mongoose.Types.ObjectId(id)).session(session);
}

/**
 * This function checks if the game exist and not finished to play move.
 * And the turn of player matched with player who wants to play.
 * @param game That will be checked for validation.
 * @param playerId That will be checked for turn constraint.
 */
function checkMoveValid(game: Game | undefined, playerId: ObjectId) {
    if (!game || game.isFinished) {
        throw new ValidationError(ERROR_MESSAGES.moveGameInvalid);
    }
    if (!game.isPlayersTurn(playerId) || game.isFinished) {
        throw new BusinessError(ERROR_MESSAGES.moveNotYourTurn);
    }
}