/* eslint-disable no-unused-labels */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpException } from '../src/common/httpexception';
import { IHttpError } from '../src/interfaces/httperror.interface';
import { mockRequest, mockResponse, mockNext } from '../__mocks__/express.mock';

const httpError = <IHttpError>{
  code: 404,
  message: 'Page not found',
};

const exception: HttpException = new HttpException(404, 'Page not found');

describe('HttpException class tests', () => {
  it('should create a HttpException object correctly', () => {
    expect(exception.toJSON()).toStrictEqual(httpError);
  });

  it('should return correct response for a server error', () => {
    const response = mockResponse();
    HttpException.errorHandler(exception, mockRequest(), response, mockNext);
    expect(
      response.status.mock.calls[response.status.mock.calls.length - 1][0],
    ).toBe(httpError.code);
    expect(
      response.send.mock.calls[response.send.mock.calls.length - 1][0],
    ).toStrictEqual(httpError);
  });

  it('should return correct response for a notfound error', () => {
    const response = mockResponse();
    HttpException.notFoundHandler(mockRequest(), response, mockNext);
    expect(
      response.status.mock.calls[response.status.mock.calls.length - 1][0],
    ).toBe(httpError.code);
    expect(
      response.send.mock.calls[response.send.mock.calls.length - 1][0],
    ).toStrictEqual(httpError);
  });
});
