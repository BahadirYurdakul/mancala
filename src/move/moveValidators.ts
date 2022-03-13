import {RequestHandler} from "express";
import {body, param} from "express-validator";
import {createValidator} from "../lib/utils/validator";
import {ERROR_MESSAGES} from "../lib/error/errorConstants";
import {GAME_CONFIG} from "../lib/config/applicationConfig";

export const makeMoveModelValidators = createValidator([
    body('fromPitNumber')
        .isInt({ min: 1 })
        .withMessage(ERROR_MESSAGES.movePitNumberInvalid),
    body('_player')
        .isMongoId()
        .withMessage(ERROR_MESSAGES.movePlayerTypeInvalid),
    body('_game')
        .isMongoId()
        .withMessage(ERROR_MESSAGES.moveGameInvalid),
]);

export const findMoveByIdValidators: RequestHandler[] = createValidator([
    param('id').isMongoId().withMessage(ERROR_MESSAGES.moveIdEmpty),
]);