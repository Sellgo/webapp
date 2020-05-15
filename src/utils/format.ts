export const formatCurrency = (num: any) =>
  Number(num).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

export const formatNumber = (num: any) => Math.round(num).toLocaleString();

export const formatRating = (num: any) => Number(num).toFixed(1);

export const formatPercent = (num: any) => Number(num).toFixed(2) + '%';

export const showNAIfZero = (num: any) => (num === '0' ? 'N.A.' : num);
