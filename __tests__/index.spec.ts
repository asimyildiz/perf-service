import { App } from '../src/app';

jest.mock('../src/app');

describe('app spec tests', () => {
  it('should have called and set all configurations on application init', () => {
    require('../src/index');
    expect(App).toBeCalled();
  });
});
