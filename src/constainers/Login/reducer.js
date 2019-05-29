import {
  FETCH_AUTH_BEGIN,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_FAILURE,
  INPUT_PASSWORD,
  INPUT_EMAIL,
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

    case FETCH_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        payload: action.payload,
      };

    case FETCH_AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case INPUT_PASSWORD:
      return {
        ...state,
        inputPassword: action.inputPassword,
      };

    case INPUT_EMAIL:
      return {
        ...state,
        error: null,
        inputEmail: action.inputEmail,
      };

    default:
      return state;
  }
};

export default logInReducer;
