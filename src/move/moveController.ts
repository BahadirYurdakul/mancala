import {NextFunction, Request, Response} from "express";
import {constants} from "http2";
import {toResponse} from "../lib/response/response";
import {findMoveById, playMove} from "./moveService";

/**
 * This controller function gather pit number, player and game fields from request body and call service to play move.
 * @param req At body there should be fromPitNumber, _player and _game fields all mandatory.
 * @param res Response object provided by express.
 * @param next Next error called to send error response to user by generic error handler.
 */
export async function makeMoveHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const {fromPitNumber, _player, _game} = req.body;
    const { game, move } = await playMove({fromPitNumber, _player, _game});
    res.status(200).send(toResponse({game, move}));
  } catch (err) {
    next(err);
  }
}

/**
 * This controller function gather id from request parameters and call service to find move.
 * @param req At param there should be id(mandatory) field.
 * @param res Response object provided by express.
 * @param next Next error called to send error response to user by generic error handler.
 */
export async function findMoveByIdHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const move = await findMoveById(id);
    return res.status(constants.HTTP_STATUS_OK).json(toResponse(move));
  } catch (err) {
    next(err);
  }
}