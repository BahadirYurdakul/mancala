import {ERROR_TYPES} from "../error/errorConstants";

export interface ISingleError {
    param?: string,
    value?: string,
    message: string,
    errorType: ERROR_TYPES,
}

export interface IResponseModel {
    success: boolean,
    data: unknown;
    errors: ISingleError[] | undefined,
}

/**
 * It converts data and error objects to generic response model.
 * @param data
 * @param errors
 */
export function toResponse(data: unknown, errors?: ISingleError[]): IResponseModel {
    return { success: !errors || errors.length === 0, data, errors };
}