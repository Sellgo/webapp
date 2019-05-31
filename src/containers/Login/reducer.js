// sample
import {
  FETCH_AUTH_BEGIN,
} from './constants';

const initialState = {
  payload: null,
  loading: false,
  error: null,
  inputPassword: '',
  inputEmail: '',
};

export const logInReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AUTH_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    default:
      return state;
  }
};

export default logInReducer;

