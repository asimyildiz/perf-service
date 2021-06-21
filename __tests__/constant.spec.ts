/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-var-requires */
const ENV_BACKUP = process.env;

beforeAll(() => {
  process.env = { ...ENV_BACKUP };
});

beforeEach(() => {
  jest.resetModules();
  process.env.PORT = '8181';
  process.env.DATABASE_DEFAULT = 'mongodb+srv://@';
  process.env.DATABASE_URL = 'fake.mongodb.net';
  process.env.DATABASE_USER = 'fakeservice';
  process.env.DATABASE_PASS = 'xxAAbbCC';
  process.env.DATABASE_NAME = 'fakedb';
});

afterAll(() => {
  process.env = ENV_BACKUP;
});

describe('environment test with fake environment', () => {
  it('should have a PORT value defined in environment', () => {
    expect(process.env.PORT).toBeDefined();
    expect(process.env.PORT).toBe('8181');

    const config = require('../src/constants/service.constants');
    expect(config.PORT).toBe(parseInt(process.env.PORT as string, 10));
  });

  it('should have a DATABASE_DEFAULT value defined in environment', () => {
    expect(process.env.DATABASE_DEFAULT).toBeDefined();
    expect(process.env.DATABASE_DEFAULT).toBe('mongodb+srv://@');
  });

  it('should have a DATABASE_URL value defined in environment', () => {
    expect(process.env.DATABASE_URL).toBeDefined();
    expect(process.env.DATABASE_URL).toBe('fake.mongodb.net');

    const config = require('../src/constants/service.constants');
    expect(config.DATABASE_URL).toBe(
      `mongodb+srv://@${process.env.DATABASE_URL}`,
    );
  });

  it('should have a DATABASE_USER value defined in environment', () => {
    expect(process.env.DATABASE_USER).toBeDefined();
    expect(process.env.DATABASE_USER).toBe('fakeservice');

    const config = require('../src/constants/service.constants');
    expect(config.DATABASE_USER).toBe(process.env.DATABASE_USER);
  });

  it('should have a DATABASE_PASS value defined in environment', () => {
    expect(process.env.DATABASE_PASS).toBeDefined();
    expect(process.env.DATABASE_PASS).toBe('xxAAbbCC');

    const config = require('../src/constants/service.constants');
    expect(config.DATABASE_PASS).toBe(process.env.DATABASE_PASS);
  });

  it('should have a DATABASE_NAME value defined in environment', () => {
    expect(process.env.DATABASE_NAME).toBeDefined();
    expect(process.env.DATABASE_NAME).toBe('fakedb');

    const config = require('../src/constants/service.constants');
    expect(config.DATABASE_NAME).toBe(process.env.DATABASE_NAME);
  });

  it('should terminate when there is no PORT defined inside process.env', () => {
    jest.spyOn(process, 'exit').mockImplementationOnce(() => {
      throw new Error('process.exit() was called.');
    });

    process.env.PORT = '';
    try {
      require('../src/constants/service.constants');
    } catch (ex) {
      expect(process.exit).toHaveBeenCalledWith(1);
      expect(true).toBe(true);
      return;
    }

    expect(false).toBe(true);
  });

  it('should terminate when there is no DATABASE_URL defined inside process.env', () => {
    jest.spyOn(process, 'exit').mockImplementationOnce(() => {
      throw new Error('process.exit() was called.');
    });

    process.env.DATABASE_URL = '';
    try {
      require('../src/constants/service.constants');
    } catch (ex) {
      expect(process.exit).toHaveBeenCalledWith(1);
      expect(true).toBe(true);
      return;
    }

    expect(false).toBe(true);
  });

  it('should terminate when there is no DATABASE_USER defined inside process.env', () => {
    jest.spyOn(process, 'exit').mockImplementationOnce(() => {
      throw new Error('process.exit() was called.');
    });

    process.env.DATABASE_USER = '';
    try {
      require('../src/constants/service.constants');
    } catch (ex) {
      expect(process.exit).toHaveBeenCalledWith(1);
      expect(true).toBe(true);
      return;
    }

    expect(false).toBe(true);
  });

  it('should terminate when there is no DATABASE_PASS defined inside process.env', () => {
    jest.spyOn(process, 'exit').mockImplementationOnce(() => {
      throw new Error('process.exit() was called.');
    });

    process.env.DATABASE_PASS = '';
    try {
      require('../src/constants/service.constants');
    } catch (ex) {
      expect(process.exit).toHaveBeenCalledWith(1);
      expect(true).toBe(true);
      return;
    }

    expect(false).toBe(true);
  });

  it('should terminate when there is no DATABASE_NAME defined inside process.env', () => {
    jest.spyOn(process, 'exit').mockImplementationOnce(() => {
      throw new Error('process.exit() was called.');
    });

    process.env.DATABASE_NAME = '';
    try {
      require('../src/constants/service.constants');
    } catch (ex) {
      expect(process.exit).toHaveBeenCalledWith(1);
      expect(true).toBe(true);
      return;
    }

    expect(false).toBe(true);
  });
});
