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
export const supplierSelector = (state: {}) => get(state, 'suppliers.supplier');
export const newSupplierIdSelector = (state: {}) => get(state, 'suppliers.newSupplier');
export const getSynthesisId = (state: {}) => get(state, 'uploadSupplier.synthesisId');
export const supplierMetricsSelector = (state: {}) => get(state, 'suppliers.timeEfficiency');

export const supplierProductsSelector = (state: {}) => get(state, 'supplier.products');
