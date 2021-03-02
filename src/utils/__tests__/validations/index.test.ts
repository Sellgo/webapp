import isAlphanumeric from '../../validations/isAlphanumeric';
import isCurrency from '../../validations/isCurrency';
import isEmail from '../../validations/isEmail';

describe('Testing validation utils', () => {
  /* Testing isAlphanumeric util */
  test('Testing isAlphanumeric Utility', () => {
    expect(isAlphanumeric('Error Message')('5')).toBeUndefined();
    expect(isAlphanumeric()('')).toBeUndefined();
    expect(isAlphanumeric()('5avghu')).toBeUndefined();
    expect(isAlphanumeric()('@5-star')).toEqual('Alphanumeric error');
    expect(isAlphanumeric('Custom Error')('@5-star')).toEqual('Custom Error');
  });

  test('Testing currency Utility', () => {
    expect(isCurrency('Error Message')('5')).toBeUndefined();
    // considers empty values as currency as well
    expect(isCurrency()('')).toBeUndefined();
    expect(isCurrency()(5)).toBeUndefined();
    expect(isCurrency()('5,000')).toBeUndefined();
    expect(isCurrency()('5,000')).toBeUndefined();

    expect(isCurrency()('5,00,0')).toEqual('Currency format error');
    expect(isCurrency('Custom Error')('5,00,0')).toEqual('Custom Error');
  });

  /* Testing isEmail Utility */
  test('Testing isEmail Utility', () => {
    expect(isEmail()('a@sellgo.com')).toBeUndefined();
    expect(isEmail()('a@sellgo-dev.com')).toBeUndefined();
    expect(isEmail()('a.sellgo@dev.com')).toBeUndefined();

    expect(isEmail()('sellgo.com@')).toEqual('Invalid email address');
    expect(isEmail('Custom Error')('sellgo.com@')).toEqual('Custom Error');
  });
});
