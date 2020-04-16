import { setIn } from '../../utils/immutablity';
import { AnyAction } from 'redux';
import get from 'lodash/get';
import {
  IS_LOADING_SUPPLIER_PRODUCTS,
  SET_SUPPLIER_PRODUCTS,
  SET_SUPPLIER_PRODUCTS_TRACK_DATA,
  RESET_SUPPLIER_PRODUCTS,
  SET_SUPPLIER_DETAILS,
  RESET_SUPPLIER,
  UPDATE_SUPPLIER_PRODUCT,
  SET_SUPPLIER_PRODUCT_TRACKER_GROUP,
  UPDATE_SUPPLIER_FILTER_RANGES,
  SET_SUPPLIER_SINGLE_PAGE_ITEMS_COUNT,
  findFilterProducts,
  SUPPLIER_QUOTA,
  FILTER_SUPPLIER_PRODUCTS,
  SEARCH_SUPPLIER_PRODUCTS,
  findFilteredProducts,
  searchFilteredProduct,
} from '../../constants/Suppliers';
import _ from 'lodash';
import { fetchAllSupplierProductTrackerDetails } from '../../actions/ProductTracker';

const initialState = {
  products: [],
  filteredProducts: [],
  filterRanges: undefined,
  details: {},
  filterData: undefined,
  filterSearch: '',
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
  singlePageItemsCount: 10,
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case IS_LOADING_SUPPLIER_PRODUCTS: {
      return setIn(state, 'isLoadingSupplierProducts', action.payload);
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
    case UPDATE_SUPPLIER_PRODUCT: {
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
      fetchAllSupplierProductTrackerDetails(filterData.period);
      console.log('period.data: ', filterData);
      const data = _.cloneDeep(filterData);
      const newState = setIn(state, 'filterData', data);
      const filteredProducts = findFilteredProducts(state.products, data);
      const searchProducts = searchFilteredProduct(filteredProducts, value);
      return setIn(newState, 'filteredProducts', searchProducts);
    }
    case SEARCH_SUPPLIER_PRODUCTS: {
      const { value, filterData } = action.payload;
      fetchAllSupplierProductTrackerDetails(filterData.period);
      console.log('period.data: ', filterData);
      const data = _.cloneDeep(filterData);
      const newState = setIn(state, 'filterSearch', value);
      const filteredProducts = findFilteredProducts(state.products, data);
      const searchProducts = searchFilteredProduct(filteredProducts, value);
      return setIn(newState, 'filteredProducts', searchProducts);
    }
    case SET_SUPPLIER_SINGLE_PAGE_ITEMS_COUNT:
      return setIn(state, 'singlePageItemsCount', action.payload);
    case SUPPLIER_QUOTA:
      return setIn(state, 'quota', action.payload);
    default:
      return state;
  }
};
