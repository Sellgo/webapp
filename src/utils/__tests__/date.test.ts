import { formatCompletedTime, formatCompletedDate } from '../date';

/* Testing formatCompletedTime  Utility */
describe('Testing formatCompletedTime Utility', () => {
  test('Testing time format : December 30,2017 21:20:25 ', () => {
    expect(formatCompletedTime(new Date('December 30, 2017 21:20:25'))).toEqual('9:20 PM');
  });

  test('Testing time format : December 30,2017 09:15:25 ', () => {
    expect(formatCompletedTime(new Date('December 30,2017 09:15:25'))).toEqual('9:15 AM');
  });

  test('Testing time format : December 30,2017 12:00:00 ', () => {
    expect(formatCompletedTime(new Date('December 30,2017 12:00:00'))).toEqual('12:00 PM');
  });

  test('Testing time format : December 30,2017 00:00:00 ', () => {
    expect(formatCompletedTime(new Date('December 30,2017 00:00:00'))).toEqual('12:00 AM');
  });
});

/* Testing formatCompletedDate Utility */
describe('Testing formatCompletedDate Utility', () => {
  test('Testing date format : December 30,2017 21:20:25', () => {
    expect(formatCompletedDate(new Date('December 30,2017 21:20:25'))).toEqual(
      '30-Dec-2017 \n 9:20 PM'
    );
  });

  test('Testing date format : December 30,2017 09:20:25', () => {
    expect(formatCompletedDate(new Date('December 30,2017 09:20:25'))).toEqual(
      '30-Dec-2017 \n 9:20 AM'
    );
  });

  test('Testing date format : January 1,2017 12:00:25', () => {
    expect(formatCompletedDate(new Date('January 1,2017 12:00:25'))).toEqual(
      '1-Jan-2017 \n 12:00 PM'
    );
  });
});
