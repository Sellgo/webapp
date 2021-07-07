import { setIn } from '../../utils/immutablity';
import { AnyAction } from 'redux';
import {
  FETCH_SELLER_DATABASE,
  FETCH_SELLER_DATABASE_SUCCESS,
  FETCH_SELLER_DATABASE_ERROR,
  SET_SELLER_DATABASE_PAGE_NO,
  SET_SELLER_DATABASE_PAGE_SIZE,
  SET_SELLER_DATABASE_PAGE_COUNT,
  SET_SELLER_DATABASE_COUNT,
  SET_SELLER_DATABASE_SINGLE_PAGE_ITEMS_COUNT,
  LOADING_DATABASE,
  SET_SELLER_DATABASE_SORT,
  SET_SELLER_DATABASE_SORT_DIRECTION,
  SET_SELLER_DATABASE_FILTERS,
  defaultFilters,
  SET_MARKETPLACE,
} from '../../constants/SellerDatabase';
import { selectItemsCountList } from '../../constants';

const initialState = {
  database: [],
  loadingSellerDatabase: false,
  pageSize: localStorage.getItem('sellerDatabasePageSize') || Number(selectItemsCountList[0].value),
  pageNo: 1,
  pageCount: 0,
  databaseCount: 0,
  error: null,
  singlePageItemsCount: 50,
  loadingDatabase: false,
  sort: 'seller_id',
  sortDirection: 'descending',
  filters: defaultFilters,
  market: 'ATVPDKIKX0DER',
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_SELLER_DATABASE: {
      return setIn(state, 'loadingSellerDatabase', action.data);
    }

    case FETCH_SELLER_DATABASE_SUCCESS: {
      return setIn(state, 'database', action.data);
    }

    case FETCH_SELLER_DATABASE_ERROR: {
      return setIn(state, 'error', action.data);
    }

    case SET_SELLER_DATABASE_PAGE_NO: {
      return setIn(state, 'pageNo', action.data);
    }

    case SET_SELLER_DATABASE_PAGE_SIZE: {
      localStorage.setItem('sellerDatabasePageSize', action.data);
      return setIn(state, 'pageSize', action.data);
    }

    case SET_SELLER_DATABASE_PAGE_COUNT: {
      return setIn(state, 'pageCount', action.data);
    }

    case SET_SELLER_DATABASE_COUNT: {
      return setIn(state, 'databaseCount', action.data);
    }
    case SET_SELLER_DATABASE_SINGLE_PAGE_ITEMS_COUNT: {
      return setIn(state, 'singlePageItemsCount', action.data);
    }

    case LOADING_DATABASE: {
      return setIn(state, 'loadingDatabase', action.data);
    }

    case SET_SELLER_DATABASE_SORT: {
      return setIn(state, 'databaseSort', action.data);
    }

    case SET_SELLER_DATABASE_SORT_DIRECTION: {
      return setIn(state, 'databaseSortDirection', action.data);
    }
    case SET_SELLER_DATABASE_FILTERS: {
      return setIn(state, 'filters', action.data);
    }

    case SET_MARKETPLACE: {
      return setIn(state, 'market', action.data);
    }
    default:
      return state;
  }
};
