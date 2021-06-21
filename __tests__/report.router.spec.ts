/* eslint-disable @typescript-eslint/no-var-requires */
import { mockRequest, mockResponse } from '../__mocks__/express.mock';
import { ReportRouter } from '../src/routers/report.router';
import { IDevice } from '../src/interfaces/device.interface';
import { IConnection } from '../src/interfaces/connection.interface';
import { DeviceServices } from '../src/services/device.services';
import { IResource } from '../src/interfaces/resource.interface';
import { ResourceServices } from '../src/services/resource.services';
import { IVital } from '../src/interfaces/vital.interface';
import { VitalServices } from '../src/services/vital.services';
import { ERROR_SERVICE, ERROR_MISSING } from '../src/constants/error.constants';

const deviceData = <IDevice>{
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

const resourceData = <IResource>{
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

const vitalData = <IVital>{
  id: 'v1-1624213181207-9776614057997',
  name: 'FCP',
  delta: 848.9000000059605,
  value: 848.9000000059605,
};

afterEach(() => {
  jest.restoreAllMocks();
});

describe('application router test with fake environment', () => {
  it('should have called save on DeviceServices when request is called with device data', () => {
    const reportRouter = new ReportRouter();
    const request = mockRequest({ body: { device: deviceData } });
    const response = mockResponse();
    DeviceServices.save = jest.fn();
    reportRouter.report(request, response);

    expect(DeviceServices.save).toBeCalled();
  });

  it('should fire an exception when save method called on DeviceServices with wrong device data', () => {
    const reportRouter = new ReportRouter();
    const request = mockRequest({ body: { device: {} } });
    const response = mockResponse();
    DeviceServices.save = jest.fn(() => {
      throw new Error();
    });

    reportRouter.report(request, response);
    expect(
      response.status.mock.calls[response.status.mock.calls.length - 1][0],
    ).toBe(ERROR_SERVICE.code);

    expect(
      response.send.mock.calls[response.send.mock.calls.length - 1][0],
    ).toStrictEqual(ERROR_SERVICE);
  });

  it('should have called save on ResourceServices when request is called with resource data', () => {
    const reportRouter = new ReportRouter();
    const request = mockRequest({ body: { resource: resourceData } });
    const response = mockResponse();
    ResourceServices.save = jest.fn();
    reportRouter.report(request, response);

    expect(ResourceServices.save).toBeCalled();
  });

  it('should fire an exception when save method called on ResourceServices with wrong device data', () => {
    const reportRouter = new ReportRouter();
    const request = mockRequest({ body: { resource: {} } });
    const response = mockResponse();
    ResourceServices.save = jest.fn(() => {
      throw new Error();
    });

    reportRouter.report(request, response);
    expect(
      response.status.mock.calls[response.status.mock.calls.length - 1][0],
    ).toBe(ERROR_SERVICE.code);

    expect(
      response.send.mock.calls[response.send.mock.calls.length - 1][0],
    ).toStrictEqual(ERROR_SERVICE);
  });

  it('should have called save on VitalServices when request is called with vital data', () => {
    const reportRouter = new ReportRouter();
    const request = mockRequest({ body: { vital: vitalData } });
    const response = mockResponse();
    VitalServices.save = jest.fn();
    reportRouter.report(request, response);

    expect(VitalServices.save).toBeCalled();
  });

  it('should fire an exception when save method called on VitalServices with wrong device data', () => {
    const reportRouter = new ReportRouter();
    const request = mockRequest({ body: { vital: {} } });
    const response = mockResponse();
    VitalServices.save = jest.fn(() => {
      throw new Error();
    });

    reportRouter.report(request, response);
    expect(
      response.status.mock.calls[response.status.mock.calls.length - 1][0],
    ).toBe(ERROR_SERVICE.code);

    expect(
      response.send.mock.calls[response.send.mock.calls.length - 1][0],
    ).toStrictEqual(ERROR_SERVICE);
  });

  it('should have fire an exception when request is called with wrong data', () => {
    const reportRouter = new ReportRouter();
    const request = mockRequest({ body: { wrong: {} } });
    const response = mockResponse();
    reportRouter.report(request, response);

    expect(
      response.status.mock.calls[response.status.mock.calls.length - 1][0],
    ).toBe(ERROR_MISSING.code);

    expect(
      response.send.mock.calls[response.send.mock.calls.length - 1][0],
    ).toStrictEqual(ERROR_MISSING);
  });
});
