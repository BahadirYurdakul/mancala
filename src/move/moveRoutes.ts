import {Express} from "express";
import {
    findMoveByIdValidators,
    makeMoveModelValidators,
} from "./moveValidators";
import {findMoveByIdHandler, makeMoveHandler} from "./moveController";

const pathPrefix = '/move';

export function moveRoutes(app: Express) {

    /**
     * @api {post} /move Make move.
     * @apiName MakeMove
     * @apiGroup Move
     *
     * @apiBody {Integer} fromPitNumber Mandatory movement pit number starts with 1 not 0!
     * @apiBody {ObjectId} _game Mandatory Object id of game.
     * @apiBody {ObjectId} _player Mandatory Player id who make the move.
     *
     * @apiSuccess {Object} Under data object -> Game and move will be returned.
     * @apiFail {Array} errors There will be message and errorType in every error element.
     */
    app.post(pathPrefix, makeMoveModelValidators, makeMoveHandler);

    /**
     * @api {get} /move/:id Get Move By Id
     * @apiName GetMove
     * @apiGroup Move
     *
     * @apiParam {String} id Mandatory id.
     *
     * @apiSuccess {Object} At data object returns move object otherwise null.
     */
    app.get(`${pathPrefix}/:id`, findMoveByIdValidators, findMoveByIdHandler);
}