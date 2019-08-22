const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const base = alphabet.length;

/**
 * Alpha
 *
 * @param {Number} n
 * @return {String}
 */

export default function(n: number): string {
  const digits: number[] = [];

  do {
    const v: number = n % base;
    digits.push(v);
    n = Math.floor(n / base);
  } while (n-- > 0);

  const chars = digits.map(digit => alphabet[digit]).reverse();

  return chars.join('');
}
