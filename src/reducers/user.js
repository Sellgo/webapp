const initState = {};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'USER_UPDATED':
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
};

export default userReducer;
