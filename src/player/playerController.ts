import {createPlayer, findPlayerById} from "./playerService";
import {NextFunction, Request, Response} from "express";
import {constants} from "http2";
import {toResponse} from "../lib/response/response";
import {IPlayerDoc} from "./playerSchema";

/**
 * This controller function gather name and age fields and calling service to create player.
 * @param req At body there will be name and age fields.
 * @param res Response object provided by express.
 * @param next Next error called to send error response to user by generic error handler.
 */
export async function createPlayerHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, age } = req.body as IPlayerDoc;
    const player = await createPlayer({ name, age });
    return res.status(constants.HTTP_STATUS_OK).json(toResponse(player));
  } catch (err) {
    next(err);
  }
}

/**
 * This controller function gather player id as request parameter and calling findPlayerById service to generate result.
 * @param req At param there will be id field representing the player.
 * @param res Response object provided by express.
 * @param next Next error called to send error response to user by generic error handler.
 */
export async function findPlayerByIdHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const player = await findPlayerById(id);
    return res.status(constants.HTTP_STATUS_OK).send(toResponse(player));
  } catch (err) {
    next(err);
  }
}