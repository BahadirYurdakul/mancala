import {RequestHandler} from "express";
import {body, param} from "express-validator";
import {createValidator} from "../lib/utils/validator";
import {ERROR_MESSAGES} from "../lib/error/errorConstants";

export const createPlayerValidators = createValidator([
    body('name')
        .isString()
        .withMessage(ERROR_MESSAGES.playerNameTypeError)
        .trim()
        .isLength({ min: 2 })
        .withMessage(ERROR_MESSAGES.playerNameMinLength)
        .isLength({ max: 100 })
        .withMessage(ERROR_MESSAGES.playerNameMaxLength),
    body('age')
        .if((age: any) => !!age)
        .isInt()
        .withMessage(ERROR_MESSAGES.playerAgeTypeError),
]);

export const findPlayerByIdValidators: RequestHandler[] = createValidator([
    param('id').isMongoId().withMessage(ERROR_MESSAGES.playerIdEmpty),
]);