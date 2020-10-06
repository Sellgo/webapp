import { setIn } from '../../utils/immutablity';
import { AnyAction } from 'redux';
import {
  FETCH_FILTERS,
  FETCH_FILTERS_SUCCESS,
  LOADING_DATA,
  SET_FETCHING_KPI,
  SET_LEADS,
  SET_LEADS_TRACKER_SINGLE_PAGE_ITEMS_COUNT,
  SET_PAGE_NO,
  SET_PAGE_SIZE,
  SET_PERIOD,
  SET_SORT,
  SET_SORT_DIRECTION,
  SET_TOTAL_RECORDS,
  TOTAL_PAGES,
} from '../../constants/LeadsTracker';

import { selectItemsCountList } from '../../constants';

const initialState = {
  details: undefined,
  detailKPI: [],
  trackerKPI: [],
  isFetchingLeadsKPI: false,
  pageNo: 1,
  pageSize: 50,
  period: 30,
  sort: 'price',
  sortDirection: 'asc',
  totalRecords: 0,
  filters: [],
  fetchingFilters: false,
  loading: false,
  singlePageItemsCount:
    localStorage.getItem('leadsTrackerPageItemsCount') || Number(selectItemsCountList[0].value),
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_FETCHING_KPI:
      return setIn(state, 'isFetchingLeadsKPI', action.payload);
    case SET_LEADS:
      return setIn(state, 'trackerKPI', action.payload.results);
    case SET_SORT:
      return setIn(state, 'sort', action.payload);
    case SET_SORT_DIRECTION:
      return setIn(state, 'sortDirection', action.payload);
    case SET_PAGE_NO:
      return setIn(state, 'pageNo', action.payload);
    case SET_PAGE_SIZE:
      return setIn(state, 'pageSize', action.payload);
    case SET_PERIOD:
      return setIn(state, 'period', action.payload);
    case SET_TOTAL_RECORDS:
      return setIn(state, 'totalRecords', action.payload);
    case TOTAL_PAGES:
      return setIn(state, 'totalPages', action.payload);
    case FETCH_FILTERS:
      return setIn(state, 'filters', action.payload);
    case FETCH_FILTERS_SUCCESS:
      return setIn(state, 'fetchingFilters', action.payload);
    case LOADING_DATA:
      return setIn(state, 'loading', action.payload);
    case SET_LEADS_TRACKER_SINGLE_PAGE_ITEMS_COUNT: {
      localStorage.setItem('leadsTrackerPageItemsCount', action.payload);
      return setIn(state, 'singlePageItemsCount', action.payload);
    }
    default:
      return state;
  }
};
