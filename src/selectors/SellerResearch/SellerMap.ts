import get from 'lodash/get';

/* Selector for the map loading state */
export const getIsLoadingSellerForMap = (state: any) => {
  return get(state, 'sellerMap.isLoadingSellers');
};

/* Selector for seller data on map */
export const getSellerDataForMap = (state: any) => {
  return get(state, 'sellerMap.sellersForMap');
};

/* Selector for loading state for sellers list */
export const getIsLoadingSellersListForMap = (state: any) => {
  return get(state, 'sellerMap.isLoadingSellersListForMap');
};

/* Selector to get sellers list for map */
export const getSellersListForMap = (state: any) => {
  return get(state, 'sellerMap.sellersListForMap');
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

/* Selector for getting the map center based on country */
export const getCenterLocationForMap = (state: any) => {
  return get(state, 'sellerMap.mapCenter');
};

/* Selector for getting the map bounds based on data */
export const getMapBounds = (state: any) => {
  return get(state, 'sellerMap.mapBounds');
};

/* Selector for getting the map zoom based on data */
export const getMapZoom = (state: any) => {
  return get(state, 'sellerMap.mapZoom');
};
