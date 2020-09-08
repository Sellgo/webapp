import { setIn } from '../../utils/immutablity';
import { AnyAction } from 'redux';
import {
  FETCH_FILE_SEARCH,
  FETCH_FILE_SEARCH_SUCCESS,
  SET_FETCHING_KPI,
  SET_LEADS,
  SET_PAGE_NO,
  SET_PAGE_SIZE,
  SET_PERIOD,
  SET_SORT,
  SET_SORT_DIRECTION,
  SET_TOTAL_RECORDS,
  TOTAL_PAGES,
} from '../../constants/LeadsTracker';

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
  fileSearch: [],
  fetchingFileSearch: false,
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
    case FETCH_FILE_SEARCH:
      return setIn(state, 'fileSearch', action.payload);
    case FETCH_FILE_SEARCH_SUCCESS:
      return setIn(state, 'fetchingFileSearch', action.payload);
    default:
      return state;
  }
};
