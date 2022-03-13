import {Express} from "express";
import {createGameHandler, findGameByIdHandler} from "./gameController";
import {createGameValidators, findGameByIdValidators} from "./gameValidators";

const pathPrefix = '/game';

export function gameRoutes(app: Express) {

    /**
     * @api {post} /game Create a new game.
     * @apiName CreateGame
     * @apiGroup Game
     *
     * @apiBody {ObjectId} _playerOne Mandatory Object id of player one.
     * @apiBody {ObjectId} _playerTwo Mandatory Object id of player two.
     *
     * @apiSuccess {Object} Under data object -> Created game will be returned.
     * @apiFail {Array} errors There will be message and errorType in every error element.
     */
    app.post(pathPrefix, createGameValidators, createGameHandler);

    /**
     * @api {get} /move/:id Get Move By Id
     * @apiName GetMove
     * @apiGroup Move
     *
     * @apiParam {String} id Mandatory id.
     *
     * @apiSuccess {Object} At data field returns move object otherwise null.
     */
    app.get(`${pathPrefix}/:id`, findGameByIdValidators, findGameByIdHandler);
}