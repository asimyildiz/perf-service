import { Request, Response, Application } from 'express';

/**
 * @class ApplicationRouter
 * @classdesc application router api methods
 */
export class ApplicationRouter {
  /**
   * constructor
   * @param _application {Application} application object - constructor assignment
   * @constructor
   */
  constructor(private _application: Application) {}

  /**
   * fake hello method to test if service works correctly
   * @param {Request} request - express request object
   * @param {Response} response - express response object
   */
  public hello(request: Request, response: Response): void {
    response.status(200).send('Welcome to perf-service');
  }
}
