import { ObjectId } from 'mongoose';
import { connect, close, clear } from '../__mocks__/database.mock';
import { data, data2 } from './data/resource.data';
import ResourceModel from '../src/models/resource.model';
import { ResourceServices } from '../src/services/resource.services';

jest.setTimeout(30000);

beforeAll(async () => await connect());
afterEach(async () => await clear());
afterAll(async () => await close());

describe('Database method tests for Resource', () => {
  it('should save resource correctly to database', async () => {
    const resourceId: ObjectId = await ResourceServices.save(data);
    const resource = await ResourceModel.findById(resourceId);

    expect(resource).not.toBe(null);
    expect(resource).toHaveProperty('__v');
    expect(resource).toHaveProperty('_id');
    expect(resource).not.toHaveProperty('createdAt');
    expect(resource).not.toHaveProperty('updatedAt');
    expect(resource?.decodedBodySize).toStrictEqual(data.decodedBodySize);
    expect(resource?.dnsLookupTime).toEqual(data.dnsLookupTime);
    expect(resource?.encodedBodySize).toEqual(data.encodedBodySize);
    expect(resource?.fetchUntilResponseEndTime).toEqual(
      data.fetchUntilResponseEndTime,
    );
    expect(resource?.id).toEqual(data.id);
    expect(resource?.initiatorType).toEqual(data.initiatorType);
    expect(resource?.name).toEqual(data.name);
    expect(resource?.redirectTime).toEqual(data.redirectTime);
    expect(resource?.requestStartUntilResponseEndTime).toEqual(
      data.requestStartUntilResponseEndTime,
    );
    expect(resource?.responseTime).toEqual(data.responseTime);
    expect(resource?.secureConnectionTime).toEqual(data.secureConnectionTime);
    expect(resource?.startUntilResponseEndTime).toEqual(
      data.startUntilResponseEndTime,
    );
    expect(resource?.tcpHandshakeTime).toEqual(data.tcpHandshakeTime);
    expect(resource?.transferSize).toEqual(data.transferSize);
  });

  it('should throw an error when wrong data is sent to register a resource metric', async () => {
    const nameBackup = data.name;
    data.name = '';
    try {
      await ResourceServices.save(data);
    } catch (ex) {
      expect(true).toBe(true);
      return;
    } finally {
      data.name = nameBackup;
    }
    expect(false).toBe(true);
  });

  it('should save multiple resources correctly to database', async () => {
    const resourceIds: Array<ObjectId> = await ResourceServices.saveMany([
      data,
      data2,
    ]);
    expect(resourceIds.length).toBe(2);

    const resources = await ResourceModel.find({ _id: { $in: resourceIds } });
    expect(resources.length).toBe(2);
  });

  it('should throw an error when wrong data is sent to register multiple resources', async () => {
    const nameBackup = data.name;
    data.name = '';
    try {
      await ResourceServices.saveMany([data, data2]);
    } catch (ex) {
      expect(true).toBe(true);
      return;
    } finally {
      data.name = nameBackup;
    }
    expect(false).toBe(true);
  });
});
