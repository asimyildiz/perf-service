import { Application } from 'express';
import { ApplicationRouter } from './routers/application.router';
import { ReportRouter } from './routers/report.router';
import { HttpException } from './common/httpexception';
import { ListRouter } from './routers/list.router';

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
   * list router object
   * @type {ListRouter}
   * @private
   */
  private _listRouter!: ListRouter;

  /**
   * constructor
   * init all routers
   * set current routes for express
   * @param _application {Application} application object - constructor assignment
   */
  constructor(private _application: Application) {
    this._initApplicationRouter();
    this._initReportRouter();
    this._initListRouter();
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
   * init list router
   * @private
   */
  private _initListRouter(): void {
    this._listRouter = new ListRouter();
  }

  /**
   * set routes for service apis
   */
  public routes(): void {
    this._application.route('/').get(this._applicationRouter.hello);
    this._application.route('/report').post(this._reportRouter.report);
    this._application.route('/reportMany').post(this._reportRouter.reportMany);

    this._application.route('/devices').post(this._listRouter.devices);
    this._application.route('/vitals').post(this._listRouter.vitals);
    this._application.route('/resources').post(this._listRouter.resources);
  }

  /**
   * set handlers for error and not found
   */
  public handlers(): void {
    this._application.use(HttpException.errorHandler);
    this._application.use(HttpException.notFoundHandler);
  }
}
