import { ObjectId } from 'mongoose';
import { connect, close, clear } from '../__mocks__/database.mock';
import { IResource } from '../src/interfaces/resource.interface';
import ResourceModel from '../src/models/resource.model';
import { ResourceServices } from '../src/services/resource.services';

jest.setTimeout(30000);

beforeAll(async () => await connect());
afterEach(async () => await clear());
afterAll(async () => await close());

const data = <IResource>{
  decodedBodySize: 89476,
  dnsLookupTime: 0,
  encodedBodySize: 89476,
  fetchUntilResponseEndTime: 286.09999999403954,
  id: 'v1-1624213181207-9776614057997',
  initiatorType: 'script',
  name: 'http://test/js/jquery.min.js',
  redirectTime: 0,
  requestStartUntilResponseEndTime: 286.09999999403954,
  responseTime: 5.5,
  secureConnectionTime: 0,
  startUntilResponseEndTime: 286.09999999403954,
  tcpHandshakeTime: 0.4000000059604645,
  transferSize: 89787,
};

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
});
