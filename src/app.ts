import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { Router } from './router';

import {
  DATABASE_URL,
  DATABASE_USER,
  DATABASE_PASS,
  DATABASE_NAME,
} from './constants/service.constants';

/**
 * @class App
 * @classdesc Basic Application class that contains express configuration
 */
export class App {
  /**
   * application object
   * manages 'express' application
   * @type {Application}
   */
  public application: Application;

  /**
   * router object
   * manages application routes
   * @type {Router}
   */
  public router!: Router;

  /**
   * constructor
   * init express
   * set configs
   * set router
   * @constructor
   */
  constructor() {
    this.application = express();
    this._setApplicationConfig();
    this._setDatabaseConfig();
    this._setRouter();
  }

  /**
   * getter for application object
   * @returns {Application}
   */
  public getApplication(): Application {
    return this.application;
  }

  /**
   * set application config
   * application can receive data in json format (limited to 50mb)
   * application can receive data in x-www-form-urlencoded format (limited to 50mb)
   * enable cors
   * @private
   */
  private _setApplicationConfig(): void {
    this.application.use(helmet());
    this.application.use(cors());
    this.application.use(express.json());
    this.application.use(express.text());
  }

  /**
   * set database config
   * for now we are using mongoDB and mongoose to manage database
   * @private
   */
  private _setDatabaseConfig(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(
      DATABASE_URL,
      {
        user: DATABASE_USER,
        pass: DATABASE_PASS,
        dbName: DATABASE_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        // drop database if needed
        // mongoose.connection.db.dropDatabase();
      },
    );

    mongoose.connection.on('error', (err) => {
      console.error(`Mongoose connection error: ${err}`);
      process.exit(1);
    });
  }

  /**
   * set router
   */
  private _setRouter(): void {
    this.router = new Router(this.application);
  }
}
