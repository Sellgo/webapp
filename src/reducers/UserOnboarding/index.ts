import { setIn } from '../../utils/immutablity';
import { AnyAction } from 'redux';
import { SET_TOS, SET_PP, SET_NOTIFY_ID } from '../../constants/UserOnboarding';

const initialState = {
  termsOfService: '',
  privacyPolicy: '',
  notifyId: 1,
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_TOS:
      return setIn(state, 'termsOfService', action.payload);
    case SET_PP:
      return setIn(state, 'privacyPolicy', action.payload);
    case SET_NOTIFY_ID:
      return setIn(state, 'notifyId', action.payload);
    default:
      return state;
  }
};
