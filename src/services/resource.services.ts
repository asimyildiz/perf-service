import { ObjectId } from 'mongoose';
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
}
