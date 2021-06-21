/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { IHttpError } from '../interfaces/httperror.interface';
import { ERROR_NOT_FOUND } from '../constants/error.constants';

/**
 * @class HttpException
 * @classdesc HttpException handler
 * @extends Error
 */
export class HttpException extends Error {
  /**
   * error status code
   * @type {number}
   */
  status: number;

  /**
   * error message
   * @type {string}
   */
  message: string;

  /**
   * HttpException constructor
   * @param {number} status - status code of error
   * @param {string} message - error message
   * @constructor
   */
  constructor(status: number, message: string) {
    super(message);

    this.status = status;
    this.message = message;
  }

  /**
   * convert error to json model for response
   * @returns {IHttpError}
   */
  public toJSON(): IHttpError {
    return {
      code: this.status,
      message: this.message,
    };
  }

  /**
   * error handler for express
   * @param {HttpException} error - http exception object
   * @param {Request} _request - express request object
   * @param {Response} response - express response object
   * @param {NextFunction} next - express next function to call
   */
  public static errorHandler(
    error: HttpException,
    _request: Request,
    response: Response,
    next: NextFunction,
  ): void {
    response.status(error.status).send(error.toJSON());
  }

  /**
   * not found (404) handler for express
   * @param {Request} _request - express request object
   * @param {Response} response - express response object
   * @param {NextFunction} next - express next function to call
   */
  public static notFoundHandler(
    _request: Request,
    response: Response,
    next: NextFunction,
  ): void {
    response.status(404).send(ERROR_NOT_FOUND);
  }
}
