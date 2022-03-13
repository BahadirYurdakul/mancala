import {constants} from "http2";
import {ISingleError, IResponseModel, toResponse} from "../response/response";
import {ERROR_TYPES} from "./errorConstants";

/**
 * Generated for multiple validation errors.
 * It is used to convert express-validator error to response.
 */
export class ApplicationError extends Error {
    // Super message is not public so here added another msg.
    private readonly msg: string;
    errorType: ERROR_TYPES;
    statusCode: number;

    constructor(msg: string, statusCode: number, errorType: ERROR_TYPES) {
        super(msg);
        this.msg = msg;
        this.errorType = errorType;
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, ApplicationError.prototype);
    }

    /**
     * Error to response object.
     */
    toResponse(): IResponseModel {
        return toResponse(undefined, [{ message: this.msg, errorType: this.errorType }]);
    }
}

export class BusinessError extends ApplicationError {
    constructor(msg: string) {
        super(msg, constants.HTTP_STATUS_BAD_REQUEST, ERROR_TYPES.BUSINESS_LOGIC_ERROR);
        Object.setPrototypeOf(this, BusinessError.prototype);
    }
}

export class ValidationError extends ApplicationError {
    constructor(msg: string) {
        super(msg, constants.HTTP_STATUS_BAD_REQUEST, ERROR_TYPES.VALIDATION_ERROR);
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}

/**
 * Generated for multiple validation errors.
 * It is used to convert express-validator error to response.
 */
export class MultipleErrors extends ApplicationError {
    errors: ISingleError[];

    constructor(msg: string, errors: ISingleError[]) {
        super(msg, constants.HTTP_STATUS_BAD_REQUEST, ERROR_TYPES.VALIDATION_ERROR);
        this.errors = errors;
        Object.setPrototypeOf(this, MultipleErrors.prototype);
    }

    toResponse(): IResponseModel {
        return toResponse(undefined, this.errors);
    }
}