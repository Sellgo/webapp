import { createSelector } from 'reselect';
import get from 'lodash/get';
import { Supplier } from '../../interfaces/Supplier';

export const supplierIdsSelector = (state: {}): number[] => get(state, 'suppliers.supplierIds');
export const suppliersByIdSelector = (state: {}): { [key: number]: Supplier } =>
  get(state, 'suppliers.suppliersById');

export const suppliersSelector = createSelector(
  [supplierIdsSelector, suppliersByIdSelector],
  (supplierIds, suppliersById): Supplier[] => {
    return supplierIds.map(supplierId => suppliersById[supplierId]);
  }
);

export const suppliersTableTabSelector = (state: {}): string =>
  get(state, 'suppliers.suppliersTableTab');
export const suppliersTableColumnsSelector = (state: {}) =>
  get(state, 'suppliers.suppliersTableColumns');
export const supplierDetailsSelector = (state: {}) => get(state, 'supplier.details');
export const supplierSelector = (state: {}) => get(state, 'suppliers.supplier');
export const newSupplierIdSelector = (state: {}) => get(state, 'suppliers.newSupplier');
export const getSynthesisId = (state: {}) => get(state, 'uploadSupplier.synthesisId');
export const supplierMetricsSelector = (state: {}) => get(state, 'suppliers.timeEfficiency');

export const supplierProductsSelector = (state: {}) => get(state, 'supplier.products');
export const supplierPageNumberSelector = (state: {}) => get(state, 'supplier.pageNumber');
export const productsLoadingDataBusterSelector = (state: {}): number[] =>
  get(state, 'supplier.productsLoadingDataBuster');
export const profitFinderPageNumber = (state: {}) => get(state, 'supplier.profitFinderPageNumber');
export const profitFinderPageSize = (state: {}) => get(state, 'supplier.profitFinderPageSize');
export const profitFinderPageCount = (state: {}) => get(state, 'supplier.profitFinderPageCount');
export const profitFinderPageLoading = (state: {}) =>
  get(state, 'supplier.profitFinderPageLoading');
export const profitFinderFilters = (state: {}) => get(state, 'supplier.filters');
export const loadingProfitFinderFilters = (state: {}) => get(state, 'supplier.fetchingFilters');
export const profitFinderSort = (state: {}) => get(state, 'supplier.sort');
export const profitFinderSortDirection = (state: {}) => get(state, 'supplier.sortDirection');
export const profitFinderTotalRecords = (state: {}) => get(state, 'supplier.totalRecords');
export const profitFinderActiveFilters = (state: {}) => get(state, 'supplier.activeFilters');
