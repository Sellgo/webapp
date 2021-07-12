import get from 'lodash/get';

/* Selector for the map loading state */
export const getIsLoadingSellerForMap = (state: any) => {
  return get(state, 'sellerMap.isLoadingSellers');
};

/* Selector for seller data on map */
export const getSellerDataForMap = (state: any) => {
  return get(state, 'sellerMap.sellersForMap');
};

/* Selector for the seller details loading state */
export const getIsLoadingSellerDetailsForMap = (state: any) => {
  return get(state, 'sellerMap.isLoadingSellerDetails');
};

/* Selector for seller details data on map */
export const getSellerDetailsDataForMap = (state: any) => {
  return get(state, 'sellerMap.sellerDetails');
};

/* Selector for getting the show state for seller card */
export const getShowSellerDetailsCardForMap = (state: any) => {
  return get(state, 'sellerMap.showSellerDetailsCard');
};
