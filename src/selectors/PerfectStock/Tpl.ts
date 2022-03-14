import get from 'lodash/get';

/* Selector to get loading state of tpl vendors */
export const getIsLoadingTplVendors = (state: any) => {
  return get(state, 'tpl.isLoadingTplVendors');
};

/* Selector to get TPL vendors */
export const getTplVendors = (state: any) => {
  return get(state, 'tpl.tplVendors');
};

/* Selector to get active TPL vendor */
export const getTplActiveVendor = (state: any) => {
  return get(state, 'tpl.activeTplVendor');
};

/* Selector to get loading state of tpl sku data */
export const getIsLoadingTplSkuData = (state: any) => {
  return get(state, 'tpl.isLoadingTplSkuData');
};

/* Selector to get tpl sku data */
export const getTplSkuData = (state: any) => {
  return get(state, 'tpl.tplSkuData');
};
