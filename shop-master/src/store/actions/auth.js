import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authSuccess = () => {
  return { type: actionTypes.AUTH_SUCCESS };
};

export const authFail = () => {
  return { type: actionTypes.AUTH_FAIL };
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
          alert("password or username is incorect");
        } else {
          alert("username does not exits");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
};
