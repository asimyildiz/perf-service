/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { App } from '../src/app';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('app spec tests', () => {
  it('should have called and set all configurations on application init', async () => {
    const spyApplicationConfig = jest.spyOn(
      App.prototype as any,
      '_setApplicationConfig',
    );
    const spyDatabaseConfig = jest.spyOn(
      App.prototype as any,
      '_setDatabaseConfig',
    );
    const spyRouter = jest.spyOn(App.prototype as any, '_setRouter');

    mongoose.connect = jest.fn();

    const app = new App();
    expect(app.getApplication()).not.toBe(null);
    expect(spyApplicationConfig).toHaveBeenCalled();
    expect(spyDatabaseConfig).toHaveBeenCalled();
    expect(spyRouter).toHaveBeenCalled();
  });

  it('should have called process.exit when database is not set', async () => {
    jest.spyOn(process, 'exit').mockImplementationOnce(() => {
      throw new Error('process.exit() was called.');
    });

    mongoose.connect = jest.fn();
    try {
      new App();
      mongoose.connection.emit('error');
    } catch (ex) {
      expect(process.exit).toHaveBeenCalledWith(1);
      expect(true).toBe(true);
      return;
    }

    expect(false).toBe(true);
  });
});
