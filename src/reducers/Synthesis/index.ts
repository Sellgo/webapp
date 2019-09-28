import {
  SET_SAVE_SUPPLIER_NAME_AND_DESCRIPTION,
  SET_TIME_EFFICIENCY,
} from '../../constants/constants';

const initialState = {
  time_efficiency_data: [],
  new_supplier: null,
};

export default (state = initialState, action: any) => {
  const newState = { ...state };
  switch (action.type) {
    case SET_TIME_EFFICIENCY:
      newState.time_efficiency_data = action.data;
      return newState;
    case SET_SAVE_SUPPLIER_NAME_AND_DESCRIPTION:
      newState.new_supplier = action.data.id;
      return newState;
    default:
      return state;
  }
};
