import { formatCurrency, formatNumber } from '../format';

/* Testing formatCurrency Utility */
describe('Testing format currency utility', () => {
  test('Testing $0 condition', () => {
    expect(formatCurrency(0)).toEqual('$0.00');
  });

  test('Testing $1000 condition', () => {
    expect(formatCurrency('1000')).toEqual('$1,000.00');
  });

  test('Testing negative value', () => {
    expect(formatCurrency(-15)).toEqual('-$15.00');
  });

  test('Testing null value', () => {
    expect(formatCurrency(null)).toEqual('$0.00');
  });

  test('Testing invalid cases', () => {
    expect(formatCurrency('1,000')).toEqual('$NaN');
    expect(formatCurrency(undefined)).toEqual('$NaN');
  });
});

/* Testing formatNumber Utility */
describe('Testing format number utility', () => {
  test('Testing valid thousand seperated value', () => {
    expect(formatNumber(12345)).toEqual('12,345');
    expect(formatNumber(1000000)).toEqual('1,000,000');
    expect(formatNumber(0)).toEqual('0');
    expect(formatNumber('1000')).toEqual('1,000');
  });

  test('Testing invalid cases', () => {
    expect(formatNumber(null)).toEqual('0');
    expect(formatNumber(undefined)).toEqual('NaN');
    expect(formatNumber('1,000')).toEqual('NaN');
  });
});
