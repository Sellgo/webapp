import isAlphanumeric from '../../validations/isAlphanumeric';
import isCurrency from '../../validations/isCurrency';
import isEmail from '../../validations/isEmail';
import isName from '../../validations/isName';
import isNumeric from '../../validations/isNumeric';
import { onlyNumber } from '../../validations/isOnlyNumber';
import { isNumber } from '../../validations/isPhone';
import isRequired from '../../validations/isRequired';
import { webUrl } from '../../validations/isUrl';

describe('Testing validation utils', () => {
  /* Testing isAlphanumeric() Utility */
  test('Testing isAlphanumeric Utility', () => {
    expect(isAlphanumeric('Error Message')('5')).toBeUndefined();
    expect(isAlphanumeric()('')).toBeUndefined();
    expect(isAlphanumeric()('5avghu')).toBeUndefined();
    expect(isAlphanumeric()('@5-star')).toEqual('Alphanumeric error');
    expect(isAlphanumeric('Custom Error')('@5-star')).toEqual('Custom Error');
  });

  /* Testing isCurrency() Utility */
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

  /* Testing isEmail() Utility */
  test('Testing isEmail Utility', () => {
    expect(isEmail()('a@sellgo.com')).toBeUndefined();
    expect(isEmail()('a@sellgo-dev.com')).toBeUndefined();
    expect(isEmail()('a.sellgo@dev.com')).toBeUndefined();
    expect(isEmail()('sellgo.com@')).toEqual('Invalid email address');
    expect(isEmail('Custom Error')('sellgo.com@')).toEqual('Custom Error');
  });

  /* Testing isName() Utility */
  test('Testing isName Utility', () => {
    expect(isName()('John Doe')).toBeUndefined();
    expect(isName()('John-Doe')).toBeUndefined();
    expect(isName()('JohnDoe@')).toEqual('Invalid characters');
    expect(isName()('JohnDoe123')).toEqual('Invalid characters');
    expect(isName()('123-JohnDoe 123')).toEqual('Invalid characters');
    expect(isName()('123-JohnDoe 123')).toEqual('Invalid characters');
    expect(isName('Custom Error')('123-JohnDoe 123')).toEqual('Custom Error');
  });

  /* Testing isNumeric() Utility */
  test('Testing isNumeric Utility', () => {
    expect(isNumeric()('5')).toBeUndefined();
    expect(isNumeric()('5,000')).toEqual('Numeric error');
    expect(isNumeric()('5.0')).toBeUndefined();
    expect(isNumeric('Custom Error')('5,000')).toEqual('Custom Error');
    expect(isNumeric()(0)).toBeUndefined();
    expect(isNumeric()('0')).toBeUndefined();
  });

  /* Testing isOnlyNumber() Utility */
  test('Testing isOnlyNumber Utility', () => {
    expect(onlyNumber()).toBeUndefined();
    expect(onlyNumber(0)).toBeUndefined();
    expect(onlyNumber(0.5)).toBeUndefined();
    expect(onlyNumber(1000)).toBeUndefined();
    expect(onlyNumber('1000')).toBeUndefined();
    expect(onlyNumber('-1,000')).toEqual('Does not accept negative value');
    expect(onlyNumber(-100)).toEqual('Does not accept negative value');
  });

  /* Testing isPhone() Utility */
  test('Testing isPhone Utility', () => {
    expect(isNumber()).toBeUndefined();
    expect(isNumber('54678')).toEqual('Please use US phone number format');
    expect(isNumber('(541)754-3010')).toEqual('Please use US phone number format');
    expect(isNumber('+1-541-754-3010')).toEqual('Please use US phone number format');
    expect(isNumber('+1 541-754-3010')).toBeUndefined();
  });

  /* Testing isRequired() Utility */
  test('Testing isRequired Utility', () => {
    expect(isRequired()()).toEqual('Required');
    expect(isRequired()(undefined)).toEqual('Required');
    expect(isRequired()(0)).toEqual('Required');
    expect(isRequired()('1,000')).toBeUndefined();
    expect(isRequired('Custom Error')('')).toEqual('Custom Error');
  });

  /* Testing isWebUrl() Utility */
  test('Testing isWebUrl', () => {
    expect(webUrl('https://www.google.comn')).toBeUndefined();
    expect(webUrl('http://app.google.comn')).toBeUndefined();
    expect(webUrl('ftp://www.google.comn')).toBeUndefined();
    expect(webUrl('www.google.com')).toBeUndefined();
    expect(webUrl('app.sellgo.com')).toBeUndefined();
    expect(webUrl('app.sellgo12345.com')).toEqual('Invalid URL');
    expect(webUrl('')).toBeUndefined();
  });
});
