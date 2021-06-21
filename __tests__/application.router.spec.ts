/* eslint-disable @typescript-eslint/no-var-requires */
import { mockRequest, mockResponse } from '../__mocks__/express.mock';
import { App } from '../src/app';

jest.mock('../src/app');

describe('application router test with fake environment', () => {
  it('should have return 200 and message for hello route', async () => {
    const { ApplicationRouter } = require('../src/routers/application.router');

    const applicationRouter = new ApplicationRouter(new App().application);
    const response = mockResponse();
    applicationRouter.hello(mockRequest(), response);
    expect(
      response.status.mock.calls[response.status.mock.calls.length - 1][0],
    ).toBe(200);

    expect(
      response.send.mock.calls[response.send.mock.calls.length - 1][0],
    ).toBe('Welcome to perf-service');
  });
});
