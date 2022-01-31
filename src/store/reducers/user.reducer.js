import * as actionTypes from '../actions';

const initialState = {
  userData: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_USER_DATA:
      return {
        ...state,
        userData: action.userData,
      };
    case actionTypes.CLEAR_USER_DATA:
      return {
        ...state,
        userData: {},
      };
    default:
      return state;
  }
};

export default userReducer;
