export function hexToRgbA(hex: string, opacity: number) {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return (
      'rgba(' +
      [(Number(c) >> 16) & 255, (Number(c) >> 8) & 255, Number(c) & 255].join(',') +
      ',' +
      opacity +
      ')'
    );
  }
  throw new Error('Bad Hex');
}

export const graphColors = [
  '#45A5F9',
  '#55D8FD',
  '#AE8BE7',
  '#A3A0FB',
  '#FEDA83',
  '#FD8373',
  '#5EE2A0',
  '#3B4557',
  '#607EFA',
  '#FDA373',
  '#55D8FD',
  '#A0F1FB',
  '#FEDA83',
  '#F9FE83',
  '#4BB480',
];
