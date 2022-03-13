import {constants} from "http2";
import {ApplicationError, ValidationError} from "./errorModels";
import {ERROR_TYPES} from "./errorConstants";
import {Error as MongoError} from "mongoose";

/**
 * To converts all errors to application error in order to classify them like validation, business etc.
 * And to return user readable secure errors to user.
 * @param error
 */
export function errorToApplicationError(error: Error): ApplicationError {
    if (error instanceof ApplicationError) {
        return error;
    }
    if (error instanceof MongoError) {
        return mongoErrorToApplicationError(error);
    }

    const errorType = getErrorType(error);
    return new ApplicationError(error.message, constants.HTTP_STATUS_BAD_REQUEST, errorType);
}

/**
 * To converts mongo errors to application error.
 * @param error It will convert mongo validation errors to application error
 */
function mongoErrorToApplicationError(error: Error) {
    if (isMongoValidationError(error)) {
        return new ValidationError((error as any)?.errors?.name?.message);
    }
    // It is returning mongo error message to user. It might not be well.
    // It would be changed for security reasons but good for tracing issues in development.
    return new ApplicationError(error.message, constants.HTTP_STATUS_BAD_REQUEST, ERROR_TYPES.VALIDATION_ERROR);
}

function isMongoValidationError(error: Error) {
    return error.name === 'ValidationError';
}

function getErrorType(error: Error): ERROR_TYPES {
    if (error.name === 'ValidationError') {
        return ERROR_TYPES.VALIDATION_ERROR;
    }
    return ERROR_TYPES.UNKNOWN_ERROR;
}