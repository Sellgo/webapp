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

/* Selector to get tpl inbounds */
export const getTplInbounds = (state: any) => {
  return get(state, 'tpl.tplInbounds');
};

/* Selector to get loading state for tpl inbounds */
export const getIsLoadingTplInbounds = (state: any) => {
  return get(state, 'tpl.isLoadingTplInbounds');
};

/* Selector to get date range */
export const getDateRange = (state: any) => {
  return get(state, 'tpl.dateRange');
};

/* Selector to get time setting */
export const getTimeSetting = (state: any) => {
  return get(state, 'tpl.timeSetting');
};

/* Selector to get active tpl inbound */
export const getActiveTplInbound = (state: any) => {
  return get(state, 'tpl.activeTplInbound');
};
