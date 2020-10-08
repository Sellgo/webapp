export const formatCurrency = (num: any) =>
  Number(num).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

export const formatNumber = (num: any) => Math.round(num).toLocaleString();

export const formatRating = (num: any) => Number(num).toFixed(1);

export const formatPercent = (num: any) => Number(num).toFixed(2) + '%';

export const showNAIfZeroOrNull = (expression: any, value: any) =>
  expression &&
  expression !== '0' &&
  expression !== '0.0' &&
  expression !== '0.00' &&
  expression !== 0
    ? value
    : '-';

export const returnWithRenderMethod = (originalColumnState: any, localColumnState: any) => {
  return localColumnState.map((localColumn: any) => {
    const [findColumnWithRender] = originalColumnState.filter((column: any) => {
      return column.dataKey === localColumn.dataKey;
    });
    return {
      ...findColumnWithRender,
      ...localColumn,
    };
  });
};
