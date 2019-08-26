import { createSelector } from 'reselect';
import get from 'lodash/get';
import { Supplier } from '../../Action/SYNActions';

export const supplierIdsSelector = (state: {}): number[] => get(state, 'suppliers.supplierIds');
export const suppliersByIdSelector = (state: {}): { [key: number]: Supplier } =>
  get(state, 'suppliers.suppliersById');

export const suppliersSelector = createSelector(
  [supplierIdsSelector, suppliersByIdSelector],
  (supplierIds, suppliersById): Supplier[] =>{
    return supplierIds.map(supplierId => suppliersById[supplierId])}
);
