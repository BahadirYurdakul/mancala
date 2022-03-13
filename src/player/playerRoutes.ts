import {Express} from "express";
import {createPlayerHandler, findPlayerByIdHandler} from "./playerController";
import {createPlayerValidators, findPlayerByIdValidators} from "./playerValidators";

const pathPrefix = '/player';

export function playerRoutes(app: Express) {

    /**
     * @api {post} /player Create New Player
     * @apiName CreatePlayer
     * @apiGroup Player
     *
     * @apiBody {String} name Mandatory name.
     * @apiBody {Integer} [age] Optional age as number.
     *
     * @apiSuccess {Object} Created player.
     */
    app.post(pathPrefix, createPlayerValidators, createPlayerHandler);

    /**
     * @api {get} /player/:id Get Player By Id
     * @apiName GetPlayer
     * @apiGroup Player
     *
     * @apiParam {String} id Mandatory id.
     *
     * @apiSuccess {Object} At data object returns player object otherwise null.
     */
    app.get(`${pathPrefix}/:id`, findPlayerByIdValidators, findPlayerByIdHandler);
}