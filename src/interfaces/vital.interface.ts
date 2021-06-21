import { IBase } from './base.interface';

/**
 * @interface IVital
 * @extends IBase
 */
export interface IVital extends IBase {
  /**
   * name of the web-vital event
   * @type {string}
   */
  name: string;

  /**
   * delta time of the web-vital event
   * @type {number}
   */
  delta: number;

  /**
   * time of the web-vital event
   * @type {number}
   */
  value: number;
}
