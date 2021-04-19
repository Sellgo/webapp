import { setIn } from '../../utils/immutablity';
import { AnyAction } from 'redux';
import {
  FETCH_SELLERS,
  FETCH_SELLERS_ERROR,
  FETCH_SELLERS_SUCCESS,
} from '../../constants/SellerFinder';

const initialState = {
  sellers: [],
  fetchingSellers: false,
  error: null,
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_SELLERS:
      return setIn(state, 'fetchingSellers', action.data);
    case FETCH_SELLERS_SUCCESS:
      return setIn(state, 'sellers', action.data);
    case FETCH_SELLERS_ERROR:
      return setIn(state, 'error', action.data);
    default:
      return state;
  }
};
