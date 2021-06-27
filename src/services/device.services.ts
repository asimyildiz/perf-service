import { FilterQuery, ObjectId } from 'mongoose';
import { IDevice } from '../interfaces/device.interface';
import Device from '../models/device.model';
import { QueryHelper } from './query.helper';

/**
 * @class DeviceServices
 * @classdesc Device services to handle device related requests
 */
export class DeviceServices {
  /**
   * save current device request to database
   * @param {Object} data - IDevice object
   * @returns {Promise<ObjectId>}
   * @throws {Error}
   * @async
   * @static
   */
  public static async save(data: unknown): Promise<ObjectId> {
    const newDevice = new Device(data);
    try {
      await newDevice.save();
      return newDevice._id;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  /**
   * save a list of devices into database
   * @param {Array<IDevice>} data - array of IDevice objects
   * @returns {Promise<Array<ObjectId>>}
   * @throws {Error}
   * @async
   * @static
   */
  public static async saveMany(data: Array<IDevice>): Promise<Array<ObjectId>> {
    try {
      const result = await Device.insertMany(data);
      return result.map((item) => item._id);
    } catch (ex) {
      throw new Error(ex);
    }
  }

  /**
   * returns all list of devices for an url
   * returns list of devices that created between startDate and endDate
   * @param {?Date} startDate - query start date
   * @param {?Date} endDate - query end date
   * @returns {Promise<Array<IDevice>>}
   */
  public static async list(
    startDate?: Date,
    endDate?: Date,
  ): Promise<Array<IDevice>> {
    const conditions = QueryHelper.getFilterDevice(
      startDate,
      endDate,
    ) as FilterQuery<IDevice>;
    const result = await Device.find(conditions);
    return result;
  }
}
