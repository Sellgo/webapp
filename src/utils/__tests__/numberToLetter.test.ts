import numberToLetter from '../numberToLetter';

/* Testing numberToLetter Utility */
describe('Testing number to letter utility', () => {
  test('Testing for number 0', () => {
    expect(numberToLetter(0)).toEqual('A');
  });

  test('Testing for number 25', () => {
    expect(numberToLetter(25)).toEqual('Z');
  });

  test('Testing for pair number 26', () => {
    expect(numberToLetter(26)).toEqual('AA');
  });

  test('Test for pair number 100', () => {
    expect(numberToLetter(100)).toEqual('CW');
  });
});
