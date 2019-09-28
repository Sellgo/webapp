import {
  SET_SUPPLIER_FILTER_UNIT_PROFIT,
  SET_SUPPLIER_FILTER_MARGIN,
  SET_SUPPLIER_FILTER_UNITS_PER_MONTH,
  SET_SUPPLIER_FILTER_PROFIT_PER_MONTH,
} from '../../constants/Synthesis/Filters';

export const setSupplierFilterUnitProfit = (data: any) => ({
  type: SET_SUPPLIER_FILTER_UNIT_PROFIT,
  payload: data,
});

export const setSupplierFilterMargin = (data: any) => ({
  type: SET_SUPPLIER_FILTER_MARGIN,
  payload: data,
});

export const setSupplierFilterUnitsPerMonth = (data: any) => ({
  type: SET_SUPPLIER_FILTER_UNITS_PER_MONTH,
  payload: data,
});

export const setSupplierFilterProfitPerMonth = (data: any) => ({
  type: SET_SUPPLIER_FILTER_PROFIT_PER_MONTH,
  payload: data,
});
