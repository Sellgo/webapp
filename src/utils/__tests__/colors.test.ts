import { graphColors, hexToRgbA } from '../colors';

/* Testing graph colors values */
describe('Testing constant graph colors', () => {
  test('testing total graph colors', () => {
    expect(graphColors.length).toEqual(15);
  });
});

/* Testing hexToRgbA Utility */
describe('Testing hex to RGBA conversion utility', () => {
  test('Testing invalid hex values', () => {
    expect(() => hexToRgbA('#1', 1)).toThrow('Bad Hex');
  });

  test('Testing for hex value #fbafff', () => {
    expect(hexToRgbA('#fbafff', 1)).toEqual('rgba(251,175,255,1)');
  });

  test('Testing for hex value #fff', () => {
    expect(hexToRgbA('#fff', 1)).toEqual('rgba(255,255,255,1)');
  });

  test('Testing for hex value #000', () => {
    expect(hexToRgbA('#000', 1)).toEqual('rgba(0,0,0,1)');
  });
});
