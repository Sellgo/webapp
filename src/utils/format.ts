export const formatCurrency = (num: any) =>
  Number(num).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

export const formatDimensionDecimals = (data: string) => {
  if (!data) return 'N.A.';
  const dimensions = data.split(`x`);
  const newDimensions = dimensions
    .map(item => {
      const trimmedItem = item.replace(`"`, '').trim();
      item = Number(trimmedItem).toFixed(1) + `"`;
      return item;
    })
    .join(` x `);

  return newDimensions;
};
export const formatNumber = (num: any) => Math.round(num).toLocaleString();

export const formatRating = (num: any) => Number(num).toFixed(1);

export const formatPercent = (num: any) => Number(num).toFixed(2) + '%';
