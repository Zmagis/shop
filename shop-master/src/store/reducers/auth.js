import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../util";

const initialState = {
  isAuthenticated: false,
  error: false,
  loading: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, { error: false, loading: true });
    case actionTypes.AUTH_SUCCESS:
      console.log(action.path);
      return updateObject(state, {
        loading: false,
        isAuthenticated: true,
      });
    case actionTypes.AUTH_FAIL:
      return updateObject(state, { loading: false });
    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, { loading: false, isAuthenticated: false });

    default:
      return state;
  }
};

export default auth;
