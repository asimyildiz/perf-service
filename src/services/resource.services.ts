import { ObjectId } from 'mongoose';
import { IResource } from '../interfaces/resource.interface';
import Resource from '../models/resource.model';

/**
 * @class ResourceServices
 * @classdesc Resource services to handle related requests
 */
export class ResourceServices {
  /**
   * save current resource request to database
   * @param {Object} data - IResource object
   * @returns {Promise<ObjectId>}
   * @throws {Error}
   * @async
   * @static
   */
  public static async save(data: unknown): Promise<ObjectId> {
    const newResource = new Resource(data);
    try {
      await newResource.save();
      return newResource._id;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  /**
   * save a list of resources into database
   * @param {Array<IResource>} data - array of IDevice objects
   * @returns {Promise<Array<ObjectId>>}
   * @throws {Error}
   * @async
   * @static
   */
  public static async saveMany(
    data: Array<IResource>,
  ): Promise<Array<ObjectId>> {
    try {
      const result = await Resource.insertMany(data);
      return result.map((item) => item._id);
    } catch (ex) {
      throw new Error(ex);
    }
  }
}
