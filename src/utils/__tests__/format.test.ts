import {
  formatCurrency,
  formatDimensionForSorting,
  formatNumber,
  formatPercent,
  formatRating,
  showNAIfZeroOrNull,
  truncateString,
} from '../format';

/* Testing formatCurrency Utility */
describe('Testing format currency utility', () => {
  test('Testing $0 condition', () => {
    expect(formatCurrency(0)).toEqual('$0.0');
  });

  test('Testing $1000 condition', () => {
    expect(formatCurrency('1000')).toEqual('$1,000');
  });

  test('Testing negative value', () => {
    expect(formatCurrency(-15)).toEqual('-$15');
  });

  test('Testing null value', () => {
    expect(formatCurrency(null)).toEqual('$0.0');
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

/* Testing formatPercent Utility */
describe('Testing format percent utility', () => {
  test('Testing numeric values', () => {
    expect(formatPercent(234)).toEqual('234.00%');
    expect(formatPercent(1000.2345)).toEqual('1000.23%');
    expect(formatPercent(0)).toEqual('0.00%');
    expect(formatPercent(0.67)).toEqual('0.67%');
  });

  test('Testing string values', () => {
    expect(formatPercent('1234')).toEqual('1234.00%');
    expect(formatPercent('1234.5')).toEqual('1234.50%');
    expect(formatPercent('1234.77')).toEqual('1234.77%');
    expect(formatPercent('1,234.5')).toEqual('NaN%');
  });

  test('Testing null and undefined values', () => {
    expect(formatPercent(null)).toEqual('0.00%');
    expect(formatPercent(undefined)).toEqual('NaN%');
  });
});

/* Testing truncateString Utility*/
describe('Testing truncate string utility', () => {
  test('Truncate Hello World to 3 characters', () => {
    expect(truncateString('Hello World', 3)).toEqual('Hel…');
  });

  test('Truncate Hello World with custom trailing chacter upto 3 characters', () => {
    expect(truncateString('Hello World', 3, '...')).toEqual('Hel...');
  });

  test('Testing empty string', () => {
    expect(truncateString('', 3, '...')).toEqual('');
  });

  test('Testing invalid truncacation condition', () => {
    expect(truncateString('Hello World', 20, '...')).toEqual('Hello World');
  });

  /* Testing formatDimensionForSorting Utility */
  describe('Testing format dimension for utility', () => {
    test('Test of 2" x 2" x 2" dimension', () => {
      expect(formatDimensionForSorting('2" x 2" x 2"')).toEqual(8);
    });

    test('Test of 2" x 2"  dimension', () => {
      expect(formatDimensionForSorting(' 2" x 2"')).toEqual(4);
    });

    test('Test of 2"  dimension', () => {
      expect(formatDimensionForSorting('2"')).toEqual(2);
    });

    test('Testing for empty value', () => {
      expect(formatDimensionForSorting('')).toEqual(-Infinity);
    });
  });

  /* Testing showNAIfZeroOrNull Utility */
  describe('Testing showNAIfZero utility', () => {
    test('Testing true condition', () => {
      expect(showNAIfZeroOrNull(true, '5')).toEqual('5');
    });

    test('Testing false condition', () => {
      expect(showNAIfZeroOrNull(false, '5')).toEqual('-');
    });

    test('Testing for zero values', () => {
      expect(showNAIfZeroOrNull(0, '5')).toEqual('-');
      expect(showNAIfZeroOrNull('0', '5')).toEqual('-');
      expect(showNAIfZeroOrNull('0.0', '5')).toEqual('-');
    });

    test('Testing for null and undefined value', () => {
      expect(showNAIfZeroOrNull(undefined, '5')).toEqual('-');
      expect(showNAIfZeroOrNull(null, '5')).toEqual('-');
    });
  });
});
