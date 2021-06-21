import { Application } from 'express';
import { ApplicationRouter } from './routers/application.router';
import { ReportRouter } from './routers/report.router';
import { HttpException } from './common/httpexception';

/**
 * @class Router
 * @classdesc Manage routing for perf-service
 */
export class Router {
  /**
   * application router object
   * @type {ApplicationRouter}
   * @private
   */
  private _applicationRouter!: ApplicationRouter;

  /**
   * report router object
   * @type {ReportRouter}
   * @private
   */
  private _reportRouter!: ReportRouter;

  /**
   * constructor
   * init all routers
   * set current routes for express
   * @param _application {Application} application object - constructor assignment
   */
  constructor(private _application: Application) {
    this._initApplicationRouter();
    this._initReportRouter();
    this.routes();
    this.handlers();
  }

  /**
   * init application router with current application object
   * @private
   */
  private _initApplicationRouter(): void {
    this._applicationRouter = new ApplicationRouter(this._application);
  }

  /**
   * init report router
   * @private
   */
  private _initReportRouter(): void {
    this._reportRouter = new ReportRouter();
  }

  /**
   * set routes for service apis
   */
  public routes(): void {
    this._application.route('/').get(this._applicationRouter.hello);
    this._application.route('/report').post(this._reportRouter.report);
  }

  /**
   * set handlers for error and not found
   */
  public handlers(): void {
    this._application.use(HttpException.errorHandler);
    this._application.use(HttpException.notFoundHandler);
  }
}
