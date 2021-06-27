/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import { QueryHelper } from '../src/services/query.helper';

describe('query helper spec tests', () => {
  it('should have create correct filtering when startDate and endDate is passed', () => {
    const startDate: Date = new Date('2021-06-20T07:56:25.919+00:00');
    const endDate: Date = new Date('2021-06-21T07:56:25.919+00:00');
    const queryFilter: any = {
      createdAt: {
        $gt: startDate,
        $lt: endDate,
      },
    };
    const filter: any = QueryHelper.getFilterDevice(startDate, endDate);
    expect(filter).toStrictEqual(queryFilter);
  });

  it('should have not created any filtering when startDate and endDate is not passed', () => {
    const filter: any = QueryHelper.getFilterDevice();
    expect(filter).toStrictEqual({});
  });

  it('should have create correct filtering when ids passed', () => {
    const ids: string[] = ['1', '2'];
    const queryFilter: any = { id: { $in: ids } };
    const filter: any = QueryHelper.getFilterId(ids);
    expect(filter).toStrictEqual(queryFilter);
  });

  it('should have not created any filtering when ids not passed', () => {
    const ids: string[] = [];
    const filter: any = QueryHelper.getFilterId(ids);
    expect(filter).toStrictEqual({});
  });

  it('should have not created any filtering when null is passed', () => {
    const filter: any = QueryHelper.getFilterId();
    expect(filter).toStrictEqual({});
  });
});
