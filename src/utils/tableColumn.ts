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
