export const SET_SUPPLIER_DETAILS = 'SET_SUPPLIER_DETAILS';
export const SET_SUPPLIER_PRODUCTS = 'SET_SUPPLIER_PRODUCTS';
export const RESET_SUPPLIER_PRODUCTS = 'RESET_SUPPLIER_PRODUCTS';
export const SET_SUPPLIER_PRODUCTS_TRACK_DATA = 'SET_SUPPLIER_PRODUCTS_TRACK_DATA';
export const RESET_SUPPLIER = 'RESET_SUPPLIER';
export const SET_SUPPLIER_PRODUCT_TRACKER_GROUP = 'SET_SUPPLIER_PRODUCT_TRACKER_GROUP';
export const UPDATE_SUPPLIER_PRODUCT = 'UPDATE_SUPPLIER_PRODUCT';
export const UPDATE_SUPPLIER_FILTER_RANGES = 'UPDATE_SUPPLIER_FILTER_RANGES';

export const dataKeys: any = ['profit', 'margin', 'sales_monthly', 'profit_monthly'];
export const initalRange = { min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER };
export const initialFilterRanges = dataKeys.reduce((fr: any, dk: string) => {
  if (!fr[dk]) fr[dk] = initalRange;
  return fr;
}, {});

export const findMinMaxRange = (products: any) => {
  const updatedFilterRanges = dataKeys.reduce((fr: any, dk: string) => {
    if (!fr[dk]) {
      const dkArray = products.map((p: any) => Number(p[dk]));
      const minDK = Math.floor(Math.min(...dkArray));
      const maxDk = Math.ceil(Math.max(...dkArray));
      const updatedDkRange = { min: minDK, max: maxDk };
      fr[dk] = updatedDkRange;
    }
    return fr;
  }, {});
  return updatedFilterRanges;
};

export const findFilterProducts = (products: any, filterRanges: any) => {
  const filterRange = (product: any) =>
    dataKeys.every(
      (dataKey: any) =>
        Number(product[dataKey]) >= Number(filterRanges[dataKey].min) &&
        Number(product[dataKey]) <= Number(filterRanges[dataKey].max)
    );
  const updatedFilterProducts = products.filter(filterRange);
  return updatedFilterProducts;
};
