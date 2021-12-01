export const onMountFixNewTableHeader = () => {
  const tableRef = document.querySelector(`.rs-table-body-wheel-area`);
  const headerRowRef = document.querySelector('.rs-table-row-header');
  const mainPageRef = document.querySelector('.admin-layout');
  mainPageRef?.addEventListener('scroll', () => {
    /* If header row is scrolled out of sight, change css of header row to fixed */
    const tableBound = tableRef?.getBoundingClientRect();
    const tableRefTop = tableBound?.top;
    if (tableRefTop && tableRefTop < 90) {
      headerRowRef?.classList.add('rs-table-row-header__fixed');
    } else {
      headerRowRef?.classList.remove('rs-table-row-header__fixed');
    }
  });
};
