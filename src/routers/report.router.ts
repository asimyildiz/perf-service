import { Request, Response } from 'express';
import { DeviceServices } from '../services/device.services';
import { ResourceServices } from '../services/resource.services';
import { VitalServices } from '../services/vital.services';
import { ERROR_SERVICE, ERROR_MISSING } from '../constants/error.constants';
import { IDevice } from '../interfaces/device.interface';
import { IVital } from '../interfaces/vital.interface';
import { IResource } from '../interfaces/resource.interface';

/**
 * @class ReportRouter
 * @classdesc report router api methods
 */
export class ReportRouter {
  /**
   * add a new report into database
   * @param {Request} request - express request object
   * @param {Response} response - express response object
   */
  public async report(request: Request, response: Response): Promise<void> {
    try {
      const data = request.body;
      if (data.device) {
        await DeviceServices.save(data.device);
      } else if (data.vital) {
        await VitalServices.save(data.vital);
      } else if (data.resource) {
        await ResourceServices.save(data.resource);
      } else {
        response.status(ERROR_MISSING.code).send(ERROR_MISSING);
        return;
      }
    } catch (ex) {
      response.status(ERROR_SERVICE.code).send(ERROR_SERVICE);
      return;
    }

    response.json({ result: true });
  }

  /**
   * add batch of data metrics into database
   * @param {Request} request - express request object
   * @param {Response} response - express response object
   * @returns {Promise<void>}
   */
  public async reportMany(request: Request, response: Response): Promise<void> {
    try {
      const data = JSON.parse(request.body as string);
      if (Array.isArray(data) && data.length > 0) {
        const deviceData: Array<IDevice> = [];
        const vitalData: Array<IVital> = [];
        const resourceData: Array<IResource> = [];

        data.forEach((item) => {
          item.device && deviceData.push(item.device);
          item.vital && vitalData.push(item.vital);
          item.resource && resourceData.push(item.resource);
        });

        await DeviceServices.saveMany(deviceData);
        await VitalServices.saveMany(vitalData);
        await ResourceServices.saveMany(resourceData);
      } else {
        response.status(ERROR_MISSING.code).send(ERROR_MISSING);
        return;
      }
    } catch (ex) {
      response.status(ERROR_SERVICE.code).send(ERROR_SERVICE);
      return;
    }

    response.json({ result: true });
  }
}
