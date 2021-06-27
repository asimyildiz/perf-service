import { FilterQuery, ObjectId } from 'mongoose';
import { IVital } from '../interfaces/vital.interface';
import Vital from '../models/vital.model';
import { QueryHelper } from './query.helper';

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

  /**
   * save a list of web-vitals into database
   * @param {Array<IVital>} data - array of IVital objects
   * @returns {Promise<Array<ObjectId>>}
   * @throws {Error}
   * @async
   * @static
   */
  public static async saveMany(data: Array<IVital>): Promise<Array<ObjectId>> {
    try {
      const result = await Vital.insertMany(data);
      return result.map((item) => item._id);
    } catch (ex) {
      throw new Error(ex);
    }
  }

  /**
   * returns all list of web-vital metrics or
   * returns list of web-vital metrics that is saved for a session
   * @param {?Array<string>} ids - list of ids
   * @returns {Promise<Array<IVital>>}
   */
  public static async list(ids?: Array<string>): Promise<Array<IVital>> {
    const conditions = QueryHelper.getFilterId(ids) as FilterQuery<IVital>;
    const result = await Vital.find(conditions);
    return result;
  }
}
