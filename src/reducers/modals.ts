import { CLOSE, OPEN } from './../constant/constant';
import { setIn } from '../utils/immutablity';
import { ModalsAction } from '../Action/modals';

interface ModalsStateInterface {
  [key: string]: {
    open: boolean;
  };
}

export default (state: ModalsStateInterface = {}, action: ModalsAction) => {
  switch (action.type) {
    case OPEN:
      return setIn(state, action.key, {
        open: true,
        meta: action.meta || null,
      });

    case CLOSE:
      return setIn(state, action.key, { open: false });

    default:
      return state;
  }
};
