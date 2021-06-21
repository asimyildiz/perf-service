import { ObjectId } from 'mongoose';
import { connect, close, clear } from '../__mocks__/database.mock';
import { IDevice } from '../src/interfaces/device.interface';
import { IConnection } from '../src/interfaces/connection.interface';
import DeviceModel from '../src/models/device.model';
import { DeviceServices } from '../src/services/device.services';

jest.setTimeout(30000);

beforeAll(async () => await connect());
afterEach(async () => await clear());
afterAll(async () => await close());

const data = <IDevice>{
  id: 'v1-1624213181207-9776614057997',
  connection: <IConnection>{
    effectiveType: '4g',
    rtt: 50,
    downlink: 8.35,
  },
  memory: 8,
  cpus: 8,
  url: 'http://test',
  referrer: '',
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
};

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
});
