import {RequestHandler} from "express";
import {body, param} from "express-validator";
import {createValidator} from "../lib/utils/validator";
import {ERROR_MESSAGES} from "../lib/error/errorConstants";

export const createGameValidators = createValidator([
    body('_playerOne')
        .isMongoId()
        .withMessage(ERROR_MESSAGES.gamePlayerEmpty),
    body('_playerTwo')
        .isMongoId()
        .withMessage(ERROR_MESSAGES.gamePlayerEmpty)
]);

export const findGameByIdValidators: RequestHandler[] = createValidator([
    param('id').isMongoId().withMessage(ERROR_MESSAGES.gameIdEmpty),
]);