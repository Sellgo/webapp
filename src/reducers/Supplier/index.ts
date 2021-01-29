import { setIn } from '../../utils/immutablity';
import { AnyAction } from 'redux';
import get from 'lodash/get';
import {
  SET_PRODUCTS_LOADING_DATA_BUSTER,
  IS_LOADING_SUPPLIER_PRODUCTS,
  SET_SUPPLIER_PRODUCTS,
  SET_SUPPLIER_PRODUCTS_TRACK_DATA,
  RESET_SUPPLIER_PRODUCTS,
  SET_SUPPLIER_DETAILS,
  RESET_SUPPLIER,
  UPDATE_SUPPLIER_PRODUCT_TRACK,
  UPDATE_PROFIT_FINDER_PRODUCTS,
  SET_SUPPLIER_PRODUCT_TRACKER_GROUP,
  UPDATE_SUPPLIER_FILTER_RANGES,
  SET_SUPPLIER_SINGLE_PAGE_ITEMS_COUNT,
  findFilterProducts,
  SUPPLIER_QUOTA,
  FILTER_SUPPLIER_PRODUCTS,
  SEARCH_SUPPLIER_PRODUCTS,
  findFilteredProducts,
  searchFilteredProduct,
  UPDATE_SUPPLIER_PRODUCT_TRACKS,
  SET_SUPPLIER_PAGE_NUMBER,
  SET_STICKY_CHART,
  SET_CONTEXT_SCROLL,
  SET_SCROLL_TOP,
  SET_IS_SCROLL,
  SET_ACTIVE_COLUMN,
  SET_SORT_COLUMN,
  UPDATE_SUPPLIER_PRODUCT,
  SET_PF_PAGE_COUNT,
  SET_PF_PAGE_NO,
  SET_PF_PAGE_SIZE,
  SET_PF_PAGE_LOADING,
  FETCH_PF_FILTERS,
  LOADING_PF_FILTERS,
  SET_PF_SORT,
  SET_PF_SORT_DIRECTION,
  SET_PF_COUNT,
  SET_PF_ACTIVE_FILTERS,
} from '../../constants/Suppliers';
import _ from 'lodash';
import { selectItemsCountList } from '../../constants';

const initialState = {
  setIsScroll: false,
  setScrollTop: false,
  setContextScroll: 0,
  setStickyChart: false,
  products: [],
  filteredProducts: [],
  filterRanges: undefined,
  details: {},
  filterData: undefined,
  filterSearch: '',
  activeColumn: '',
  sortedColumn: '',
  trackData: {
    avg_price: '',
    daily_rank: 0,
    daily_sales: '',
    date_range: 0,
    fees: '',
    id: 0,
    monthly_sales: '',
    product_track_group_id: 0,
    profit: '',
    rating: '',
    review: 0,
    roi: '',
    size_tier: '',
    weight: '',
  },
  singlePageItemsCount:
    localStorage.getItem('supplierPageItemsCount') || Number(selectItemsCountList[0].value),
  pageNumber: 1,
  productsLoadingDataBuster: [],
  profitFinderPageNumber: 1,
  profitFinderPageSize: 50,
  profitFinderPageCount: 0,
  profitFinderPageLoading: false,
  filters: [],
  fetchingFilters: false,
  sort: 'price',
  sortDirection: 'asc',
  totalRecords: 0,
  activeFilters: [],
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case IS_LOADING_SUPPLIER_PRODUCTS: {
      return setIn(state, 'isLoadingSupplierProducts', action.payload);
    }
    case SET_ACTIVE_COLUMN: {
      return setIn(state, 'activeColumn', action.payload);
    }
    case SET_SORT_COLUMN: {
      return setIn(state, 'sortedColumn', action.payload);
    }
    case SET_SUPPLIER_PRODUCTS: {
      return setIn(state, 'products', action.payload);
    }
    case RESET_SUPPLIER_PRODUCTS: {
      return initialState;
    }
    case SET_SUPPLIER_DETAILS: {
      return setIn(state, 'details', action.payload);
    }
    case UPDATE_SUPPLIER_PRODUCT_TRACK: {
      const updateProduct = action.payload;
      const products = get(state, 'products').map((product: any) => {
        const checkProduct = product;
        if (checkProduct.product_id === updateProduct.product_id) {
          checkProduct.tracking_status = updateProduct.status;
          checkProduct.product_track_id = updateProduct.id;
        }
        return checkProduct;
      });
      return setIn(state, 'products', products);
    }
    case UPDATE_SUPPLIER_PRODUCT_TRACKS: {
      const updateProducts = action.payload;
      const products = get(state, 'products').map((product: any) => {
        const checkProduct = product;
        updateProducts.forEach((updateProduct: any) => {
          if (checkProduct.product_id === updateProduct.product_id) {
            checkProduct.tracking_status = updateProduct.status;
            checkProduct.product_track_id = updateProduct.id;
          }
        });
        return checkProduct;
      });
      return setIn(state, 'products', products);
    }
    case UPDATE_PROFIT_FINDER_PRODUCTS: {
      const { filteredProducts } = action.payload;
      return setIn(state, 'filteredProducts', filteredProducts);
    }
    case SET_SUPPLIER_PRODUCTS_TRACK_DATA: {
      return setIn(state, 'trackData', action.payload);
    }
    case SET_SUPPLIER_PRODUCT_TRACKER_GROUP:
      return setIn(state, 'productTrackerGroup', action.payload);
    case RESET_SUPPLIER: {
      return initialState;
    }
    case UPDATE_SUPPLIER_FILTER_RANGES: {
      const filterRanges = action.payload;
      const newState = setIn(state, 'filterRanges', filterRanges);
      // Also update filteredProducts in state each time filterRanges changes
      const filteredProducts = findFilterProducts(state.products, filterRanges);
      return setIn(newState, 'filteredProducts', filteredProducts);
    }
    case FILTER_SUPPLIER_PRODUCTS: {
      const { value, filterData } = action.payload;
      const data = _.cloneDeep(filterData);
      const newState = setIn(state, 'filterData', data);
      const filteredProducts = findFilteredProducts(state.products, data);
      const searchProducts = searchFilteredProduct(filteredProducts, value);
      return setIn(newState, 'filteredProducts', searchProducts);
    }
    case SEARCH_SUPPLIER_PRODUCTS: {
      const { value, filterData } = action.payload;
      const data = _.cloneDeep(filterData);
      const newState = setIn(state, 'filterSearch', value);
      const filteredProducts = findFilteredProducts(state.products, data);
      const searchProducts = searchFilteredProduct(filteredProducts, value);
      return setIn(newState, 'filteredProducts', searchProducts);
    }
    case SET_SUPPLIER_SINGLE_PAGE_ITEMS_COUNT: {
      localStorage.setItem('supplierPageItemsCount', action.payload);
      return setIn(state, 'singlePageItemsCount', action.payload);
    }
    case SET_SUPPLIER_PAGE_NUMBER: {
      return setIn(state, 'pageNumber', action.payload);
    }
    case SET_STICKY_CHART: {
      return setIn(state, 'setStickyChart', action.payload);
    }
    case SET_CONTEXT_SCROLL: {
      return setIn(state, 'setContextScroll', action.payload);
    }
    case SET_SCROLL_TOP: {
      return setIn(state, 'setScrollTop', action.payload);
    }
    case SET_IS_SCROLL: {
      return setIn(state, 'setIsScroll', action.payload);
    }
    case SUPPLIER_QUOTA: {
      return setIn(state, 'quota', action.payload);
    }
    case SET_PRODUCTS_LOADING_DATA_BUSTER: {
      return setIn(state, 'productsLoadingDataBuster', action.payload);
    }
    case UPDATE_SUPPLIER_PRODUCT: {
      const updateProduct = action.payload;
      const products = get(state, 'products').map((product: any) => {
        return product.product_id === updateProduct.product_id ? updateProduct : product;
      });
      const nextState = setIn(state, 'products', products);
      const filteredProducts = get(state, 'filteredProducts').map((product: any) => {
        return product.product_id === updateProduct.product_id ? updateProduct : product;
      });
      return setIn(nextState, 'filteredProducts', filteredProducts);
    }
    case SET_PF_PAGE_NO: {
      return setIn(state, 'profitFinderPageNumber', action.payload);
    }

    case SET_PF_PAGE_SIZE: {
      return setIn(state, 'profitFinderPageSize', action.payload);
    }

    case SET_PF_PAGE_COUNT: {
      return setIn(state, 'profitFinderPageCount', action.payload);
    }

    case SET_PF_PAGE_LOADING: {
      return setIn(state, 'profitFinderPageLoading', action.payload);
    }

    case FETCH_PF_FILTERS: {
      return setIn(state, 'filters', action.payload);
    }

    case LOADING_PF_FILTERS: {
      return setIn(state, 'fetchingFilters', action.payload);
    }

    case SET_PF_SORT: {
      return setIn(state, 'sort', action.payload);
    }

    case SET_PF_SORT_DIRECTION: {
      return setIn(state, 'sortDirection', action.payload);
    }

    case SET_PF_COUNT: {
      return setIn(state, 'totalRecords', action.payload);
    }

    case SET_PF_ACTIVE_FILTERS: {
      return setIn(state, 'activeFilters', action.payload);
    }
    default:
      return state;
  }
};
