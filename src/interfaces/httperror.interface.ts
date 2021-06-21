/**
 * @interface IHttpError
 */
export interface IHttpError {
  /**
   * error code
   * @type {number}
   */
  code: number;

  /**
   * error message
   * @type {string}
   */
  message: string;
}
