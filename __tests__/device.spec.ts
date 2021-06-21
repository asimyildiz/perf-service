import { ObjectId } from 'mongoose';
import { connect, close, clear } from '../__mocks__/database.mock';
import { data, data2 } from './data/device.data';
import DeviceModel from '../src/models/device.model';
import { DeviceServices } from '../src/services/device.services';

jest.setTimeout(30000);

beforeAll(async () => await connect());
afterEach(async () => await clear());
afterAll(async () => await close());

describe('Database method tests for Device', () => {
  it('should save devices correctly to database', async () => {
    const deviceId: ObjectId = await DeviceServices.save(data);
    const device = await DeviceModel.findById(deviceId);

    expect(device).not.toBe(null);
    expect(device).toHaveProperty('__v');
    expect(device).toHaveProperty('_id');
    expect(device).toHaveProperty('createdAt');
    expect(device).toHaveProperty('updatedAt');
    expect(device?.connection).toStrictEqual(data.connection);
    expect(device?.memory).toEqual(data.memory);
    expect(device?.cpus).toEqual(data.cpus);
    expect(device?.url).toEqual(data.url);
    expect(device?.referrer).toEqual(data.referrer);
    expect(device?.userAgent).toEqual(data.userAgent);
  });

  it('should throw an error when wrong data is sent to register a device', async () => {
    const urlBackup = data.url;
    data.url = '';
    try {
      await DeviceServices.save(data);
    } catch (ex) {
      expect(true).toBe(true);
      return;
    } finally {
      data.url = urlBackup;
    }
    expect(false).toBe(true);
  });

  it('should save multiple devices correctly to database', async () => {
    const deviceIds: Array<ObjectId> = await DeviceServices.saveMany([
      data,
      data2,
    ]);
    expect(deviceIds.length).toBe(2);

    const devices = await DeviceModel.find({ _id: { $in: deviceIds } });
    expect(devices.length).toBe(2);
  });

  it('should throw an error when wrong data is sent to register multiple devices', async () => {
    const urlBackup = data.url;
    data.url = '';
    try {
      await DeviceServices.saveMany([data, data2]);
    } catch (ex) {
      expect(true).toBe(true);
      return;
    } finally {
      data.url = urlBackup;
    }
    expect(false).toBe(true);
  });
});
