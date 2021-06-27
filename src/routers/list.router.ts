import { Request, Response } from 'express';
import { DeviceServices } from '../services/device.services';
import { ResourceServices } from '../services/resource.services';
import { VitalServices } from '../services/vital.services';
import { ERROR_SERVICE } from '../constants/error.constants';
import { IDevice } from '../interfaces/device.interface';
import { IVital } from '../interfaces/vital.interface';
import { IResource } from '../interfaces/resource.interface';

/**
 * @class ListRouter
 * @classdesc list router api methods
 */
export class ListRouter {
  /**
   * find list of devices from database
   * filter devices based on createdAt field if startDate or endDate is passed inside request
   * @param {Request} request - express request object
   * @param {Response} response - express response object
   */
  public async devices(request: Request, response: Response): Promise<void> {
    let result: Array<IDevice> = [];
    try {
      const { startDate, endDate } = request.body;
      result = await DeviceServices.list(startDate, endDate);
    } catch (ex) {
      response.status(ERROR_SERVICE.code).send(ERROR_SERVICE);
      return;
    }

    response.json({ result });
  }

  /**
   * find list of web-vital metrics from database
   * filter web-vital metrics based on id field if a list of ids passed inside request
   * @param {Request} request - express request object
   * @param {Response} response - express response object
   */
  public async vitals(request: Request, response: Response): Promise<void> {
    let result: Array<IVital> = [];
    try {
      const { ids } = request.body;
      result = await VitalServices.list(ids);
    } catch (ex) {
      response.status(ERROR_SERVICE.code).send(ERROR_SERVICE);
      return;
    }

    response.json({ result });
  }

  /**
   * find list of resource metrics from database
   * filter resource metrics based on id field if a list of ids passed inside request
   * @param {Request} request - express request object
   * @param {Response} response - express response object
   */
  public async resources(request: Request, response: Response): Promise<void> {
    let result: Array<IResource> = [];
    try {
      const { ids } = request.body;
      result = await ResourceServices.list(ids);
    } catch (ex) {
      response.status(ERROR_SERVICE.code).send(ERROR_SERVICE);
      return;
    }

    response.json({ result });
  }
}
