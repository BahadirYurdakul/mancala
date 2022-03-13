import {Game} from "./gameModels";
import {ERROR_MESSAGES} from "../lib/error/errorConstants";
import {ObjectId} from "mongoose";
import {BusinessError} from "../lib/error/errorModels";
import {GameDoc, IGameDoc} from "./gameSchema";

/**
 * It will create game and board in it and save it to db.
 * The first player will be play first. If you want to change the turn then call new Game with turnPlayerIndex = 1.
 * The player objects should be different. The Player cannot play with himself/herself.
 * @param _playerOne Player one object id.
 * @param _playerTwo Player two object id.
 */
export async function createGame(_playerOne: ObjectId, _playerTwo: ObjectId) {
    if (_playerOne === _playerTwo) {
        throw new BusinessError(ERROR_MESSAGES.gamePlayerCannotPlayWithHimself);
    }
    const game = new Game([_playerOne, _playerTwo]);
    return await new GameDoc(game).save();
}

export async function updateGameById(id: ObjectId, game: Game, session?: any) {
    await GameDoc.findByIdAndUpdate(id, game).session(session);
}

export async function findGameById(id: ObjectId | string, session?: any): Promise<IGameDoc | null> {
    return GameDoc.findById(id).session(session);
}