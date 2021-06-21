import { ObjectId } from 'mongoose';
import { connect, close, clear } from '../__mocks__/database.mock';
import { IVital } from '../src/interfaces/vital.interface';
import VitalModel from '../src/models/vital.model';
import { VitalServices } from '../src/services/vital.services';

jest.setTimeout(30000);

beforeAll(async () => await connect());
afterEach(async () => await clear());
afterAll(async () => await close());

const data = <IVital>{
  id: 'v1-1624213181207-9776614057997',
  name: 'FCP',
  delta: 848.9000000059605,
  value: 848.9000000059605,
};

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
});
