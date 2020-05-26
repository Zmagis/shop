import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authSuccess = () => {
  return { type: actionTypes.AUTH_SUCCESS };
};

export const authFail = (errorMsg) => {
  return { type: actionTypes.AUTH_FAIL, errorMsg };
};

export const authStart = () => {
  return { type: actionTypes.AUTH_START };
};

export const logout = () => {
  return { type: actionTypes.AUTH_LOGOUT };
};

export const auth = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = { username, password };
    axios
      .post("http://localhost:9000/login", authData)
      .then((result) => {
        if (result.status === 200) {
          dispatch(authSuccess());
        } else if (result.status === 204) {
          dispatch(authFail("Password or username is incorect"));
        } else {
          dispatch(authFail("Username does not exits"));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const register = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const registerData = { username, password };
    axios
      .post("http://localhost:9000/create", registerData)
      .then((result) => {
        if (result.status === 200) {
          dispatch(authSuccess());
        } else if (result.status === 204) {
          dispatch(authFail("Username already exits"));
        } else {
          dispatch(authFail("Something went wrong"));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
};
