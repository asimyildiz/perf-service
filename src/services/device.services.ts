import { ObjectId } from 'mongoose';
import Device from '../models/device.model';

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
}
