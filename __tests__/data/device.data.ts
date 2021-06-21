import { IDevice } from '../../src/interfaces/device.interface';
import { IConnection } from '../../src/interfaces/connection.interface';

export const data = <IDevice>{
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

export const data2 = <IDevice>{
  id: 'v1-1624213181207-173451425222',
  connection: <IConnection>{
    effectiveType: '5g',
    rtt: 30,
    downlink: 3.35,
  },
  memory: 4,
  cpus: 4,
  url: 'http://test',
  referrer: '',
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
};
