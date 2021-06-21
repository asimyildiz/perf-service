import { IHttpError } from '../interfaces/httperror.interface';

/**
 * 404 error not found error message
 * @type {IHttpError}
 */
export const ERROR_NOT_FOUND: IHttpError = {
  code: 404,
  message: 'Page not found',
};

/**
 * 500 error message
 * @type {IHttpError}
 */
export const ERROR_SERVICE: IHttpError = {
  code: 500,
  message: 'Service error',
};

/**
 * 400 error message
 * @type {IHttpError}
 */
export const ERROR_MISSING: IHttpError = {
  code: 400,
  message: 'Missing data',
};
