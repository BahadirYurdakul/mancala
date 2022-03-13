import {IPlayer} from "./playerModel";
import {IPlayerDoc, PlayerDoc} from "./playerSchema";

/**
 * This function saving the player to database and returning created mongoose document.
 * @param player that will be saved to database.
 * @param session If you want to set transaction send mongoose session to method.
 */
export async function createPlayer(player: IPlayer, session?: any): Promise<IPlayerDoc> {
    return new PlayerDoc(player).save({ session });
}

/**
 * This function will be find and return the player with id, otherwise  return null.
 * @param id Player id field that will be used to find the player.
 * @param session If you want to set transaction send mongoose session to method.
 */
export async function findPlayerById(id: string, session?: any): Promise<IPlayerDoc | null> {
    return PlayerDoc.findById(id).session(session);
}