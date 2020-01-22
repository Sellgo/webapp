import Axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppConfig } from '../../config';
import { SET_TOS } from '../../constants/UserOnboarding/index';

export const setTOS = (termsOfService: string) => ({
  type: SET_TOS,
  payload: termsOfService,
});

export const fetchTOS = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const response = await Axios.get(AppConfig.BASE_URL_API + `content?type=terms_of_service`);
  if (response.data.length) {
    dispatch(setTOS(response.data));
  }
};
