import { ObjectId } from 'mongoose';
import Vital from '../models/vital.model';

/**
 * @class VitalServices
 * @classdesc Vital services to handle related requests
 */
export class VitalServices {
  /**
   * save current web-vital request to database
   * @param {Object} data - IVital object
   * @returns {Promise<ObjectId>}
   * @throws {Error}
   * @async
   * @static
   */
  public static async save(data: unknown): Promise<ObjectId> {
    const newVitalData = new Vital(data);
    try {
      await newVitalData.save();
      return newVitalData._id;
    } catch (ex) {
      throw new Error(ex);
    }
  }
}
