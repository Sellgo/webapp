import { setIn } from '../../utils/immutablity';
import { AnyAction } from 'redux';
import { SET_TOS } from '../../constants/UserOnboarding';

const initialState = {
  termsOfService: '',
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_TOS:
      return setIn(state, 'termsOfService', action.payload);
    default:
      return state;
  }
};
