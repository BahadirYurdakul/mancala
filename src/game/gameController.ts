import {createGame, findGameById} from "./gameService";
import {NextFunction, Request, Response} from "express";
import {constants} from "http2";
import {toResponse} from "../lib/response/response";

/**
 * This controller function gather player(1,2) infos from request and calling create game service.
 * @param req At body there should be _playerOne and _playerTwo
 * @param res Response object provided by express.
 * @param next Next error called to send error response to user by generic error handler.
 */
export async function createGameHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { _playerOne, _playerTwo } = req.body;
    const game = await createGame(_playerOne, _playerTwo);
    return res.status(constants.HTTP_STATUS_OK).json(toResponse(game));
  } catch (err) {
    next(err);
  }
}

/**
 * This controller function gather game id as request parameter and calling findGameById service to generate result.
 * @param req At param there will be id field representing the game.
 * @param res Response object provided by express.
 * @param next Next error called to send error response to user by generic error handler.
 */
export async function findGameByIdHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const game = await findGameById(id);
    return res.status(constants.HTTP_STATUS_OK).json(toResponse(game));
  } catch (err) {
    next(err);
  }
}