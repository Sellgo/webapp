import { formatCurrency, formatNumber, formatRating } from '../format';

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

/* Testing formatRating Utility */
describe('Testing format rating utility', () => {
  test('Testing numeric values', () => {
    expect(formatRating(234)).toEqual('234.0');
    expect(formatRating(1000.2345)).toEqual('1000.2');
    expect(formatRating(0)).toEqual('0.0');
    expect(formatRating(0.67)).toEqual('0.7');
  });

  test('Testing string values', () => {
    expect(formatRating('1234')).toEqual('1234.0');
    expect(formatRating('1234.5')).toEqual('1234.5');
    expect(formatRating('1234.77')).toEqual('1234.8');
    expect(formatRating('1,234.5')).toEqual('NaN');
  });

  test('Testing null and undefined values', () => {
    expect(formatRating(null)).toEqual('0.0');
    expect(formatRating(undefined)).toEqual('NaN');
  });
});
