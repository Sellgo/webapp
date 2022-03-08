import get from 'lodash/get';

/* Selector to get loading state of tpl vendors */
export const getIsLoadingTplVendors = (state: any) => {
  return get(state, 'tpl.isLoadingTplVendors');
};

/* Selector to get TPL vendors */
export const getTplVendors = (state: any) => {
  return get(state, 'tpl.tplVendors');
};
