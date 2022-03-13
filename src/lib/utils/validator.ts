import {NextFunction, Request, RequestHandler, Response} from "express";
import {validationResult} from "express-validator";
import {MultipleErrors} from "../error/errorModels";
import {ERROR_MESSAGES, ERROR_TYPES} from "../error/errorConstants";

/**
 * Use in order to wrap express-validator and send custom error response to users.
 * @param validators
 */
export function createValidator(validators: RequestHandler[]): RequestHandler[] {
    return [
        ...validators,
        checkValidationResults,
    ];
}

/**
 * To format express-validator errors to custom error format.
 * @param req
 * @param res
 * @param next
 */
function checkValidationResults(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    // If there is no error call next function.
    if(errors.isEmpty()) {
        return next();
    }
    // Format express-validator errors to custom format.
    const appErrors = errors.formatWith((error) => ({
        param: error.param,
        value: error.value,
        message: error.msg,
        errorType: ERROR_TYPES.VALIDATION_ERROR,
    })).array();

    // Generate multiple validation errors and return them as array by genericErrorHandler.
    next(new MultipleErrors(ERROR_MESSAGES.generalValidationError, appErrors));
}