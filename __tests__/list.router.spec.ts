/* eslint-disable @typescript-eslint/no-var-requires */
import { mockRequest, mockResponse } from '../__mocks__/express.mock';
import { ListRouter } from '../src/routers/list.router';
import { DeviceServices } from '../src/services/device.services';
import { ResourceServices } from '../src/services/resource.services';
import { VitalServices } from '../src/services/vital.services';
import { ERROR_SERVICE } from '../src/constants/error.constants';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('list router test with fake environment', () => {
  it('should have called list on DeviceServices when request is made to devices', async () => {
    const listRouter = new ListRouter();
    const request = mockRequest({ body: {} });
    const response = mockResponse();
    DeviceServices.list = jest.fn();
    await listRouter.devices(request, response);
    expect(DeviceServices.list).toBeCalled();
  });

  it('should have called list on VitalServices when request is made to vitals', async () => {
    const listRouter = new ListRouter();
    const request = mockRequest({ body: {} });
    const response = mockResponse();
    VitalServices.list = jest.fn();
    await listRouter.vitals(request, response);
    expect(VitalServices.list).toBeCalled();
  });

  it('should have called list on VitalServices when request is made to resources', async () => {
    const listRouter = new ListRouter();
    const request = mockRequest({ body: {} });
    const response = mockResponse();
    ResourceServices.list = jest.fn();
    await listRouter.resources(request, response);
    expect(ResourceServices.list).toBeCalled();
  });

  it('should fire an exception when list method called on DeviceServices with wrong device data', async () => {
    const listRouter = new ListRouter();
    const request = mockRequest({ body: {} });
    const response = mockResponse();
    DeviceServices.list = jest.fn(() => {
      throw new Error();
    });

    await listRouter.devices(request, response);
    expect(
      response.status.mock.calls[response.status.mock.calls.length - 1][0],
    ).toBe(ERROR_SERVICE.code);
    expect(
      response.send.mock.calls[response.send.mock.calls.length - 1][0],
    ).toStrictEqual(ERROR_SERVICE);
  });

  it('should fire an exception when list method called on VitalServices with wrong device data', async () => {
    const listRouter = new ListRouter();
    const request = mockRequest({ body: {} });
    const response = mockResponse();
    VitalServices.list = jest.fn(() => {
      throw new Error();
    });

    await listRouter.vitals(request, response);
    expect(
      response.status.mock.calls[response.status.mock.calls.length - 1][0],
    ).toBe(ERROR_SERVICE.code);
    expect(
      response.send.mock.calls[response.send.mock.calls.length - 1][0],
    ).toStrictEqual(ERROR_SERVICE);
  });

  it('should fire an exception when list method called on ResourceServices with wrong device data', async () => {
    const listRouter = new ListRouter();
    const request = mockRequest({ body: {} });
    const response = mockResponse();
    ResourceServices.list = jest.fn(() => {
      throw new Error();
    });

    await listRouter.resources(request, response);
    expect(
      response.status.mock.calls[response.status.mock.calls.length - 1][0],
    ).toBe(ERROR_SERVICE.code);
    expect(
      response.send.mock.calls[response.send.mock.calls.length - 1][0],
    ).toStrictEqual(ERROR_SERVICE);
  });
});
