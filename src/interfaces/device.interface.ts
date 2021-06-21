import { IBase } from './base.interface';
import { IConnection } from './connection.interface';

/**
 * @interface IDevice
 * @extends IBase
 */
export interface IDevice extends IBase {
  /**
   * IConnection data
   * @type {IConnection}
   */
  connection: IConnection;

  /**
   * cpu information
   * @type {number}
   */
  cpus: number;

  /**
   * memory information
   * @type {number}
   */
  memory: number;

  /**
   * referrer information
   * @type {string}
   */
  referrer: string;

  /**
   * url information
   * @type {string}
   */
  url: string;

  /**
   * userAgent information
   * @type {string}
   */
  userAgent: string;
}
