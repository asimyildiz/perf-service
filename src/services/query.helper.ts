import moment from 'moment';

/**
 * @class QueryHelper
 * @classdesc Query helper to create queries
 */
export class QueryHelper {
  /**
   * creates a query for createdAt field
   * @param {?Date} startDate - query start date
   * @param {?Date} endDate - query end date
   * @returns {unknown}
   */
  public static getFilterDevice(startDate?: Date, endDate?: Date): unknown {
    if (
      startDate &&
      endDate &&
      moment(startDate).isValid() &&
      moment(endDate).isValid()
    ) {
      return {
        createdAt: {
          $gt: startDate,
          $lt: endDate,
        },
      };
    }

    return {};
  }

  /**
   * creates a query for id field using a list of ids
   * @param {?Array<string>} ids - list of ids
   * @returns {unknown}
   */
  public static getFilterId(ids?: Array<string>): unknown {
    if (Array.isArray(ids) && ids.length > 0) {
      return { id: { $in: ids } };
    }

    return {};
  }
}
