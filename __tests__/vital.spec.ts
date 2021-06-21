import { ObjectId } from 'mongoose';
import { connect, close, clear } from '../__mocks__/database.mock';
import { data, data2 } from './data/vital.data';
import VitalModel from '../src/models/vital.model';
import { VitalServices } from '../src/services/vital.services';

jest.setTimeout(30000);

beforeAll(async () => await connect());
afterEach(async () => await clear());
afterAll(async () => await close());

describe('Database method tests for Vital', () => {
  it('should save web vitals correctly to database', async () => {
    const vitalId: ObjectId = await VitalServices.save(data);
    const vital = await VitalModel.findById(vitalId);

    expect(vital).not.toBe(null);
    expect(vital).toHaveProperty('__v');
    expect(vital).toHaveProperty('_id');
    expect(vital).not.toHaveProperty('createdAt');
    expect(vital).not.toHaveProperty('updatedAt');
    expect(vital?.id).toEqual(data.id);
    expect(vital?.name).toEqual(data.name);
    expect(vital?.delta).toEqual(data.delta);
    expect(vital?.value).toEqual(data.value);
  });

  it('should throw an error when wrong data is sent to register a vital metric', async () => {
    const nameBackup = data.name;
    data.name = '';
    try {
      await VitalServices.save(data);
    } catch (ex) {
      expect(true).toBe(true);
      return;
    } finally {
      data.name = nameBackup;
    }
    expect(false).toBe(true);
  });

  it('should save multiple web-vitals correctly to database', async () => {
    const vitalIds: Array<ObjectId> = await VitalServices.saveMany([
      data,
      data2,
    ]);
    expect(vitalIds.length).toBe(2);

    const vitals = await VitalModel.find({ _id: { $in: vitalIds } });
    expect(vitals.length).toBe(2);
  });

  it('should throw an error when wrong data is sent to register multiple vitals', async () => {
    const nameBackup = data.name;
    data.name = '';
    try {
      await VitalServices.saveMany([data, data2]);
    } catch (ex) {
      expect(true).toBe(true);
      return;
    } finally {
      data.name = nameBackup;
    }
    expect(false).toBe(true);
  });
});
