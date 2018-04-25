import { getItem } from "../../services/localCache";
import { push } from "react-router-redux";
export const SET_USER = "SET_USER";
export const SET_TOKEN = "SET_TOKEN";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const START_LOGIN = "START_LOGIN";

export const loginRequest = data => dispatch => {
  const url = "/api/auth";
  const { username, password } = data;
  const formBody = `username=${username}&password=${encodeURIComponent(
    password
  )}`;
  const params = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formBody
  };
  dispatch(startLogin());
  fetch(url, params)
    .then(resp => {
      if (resp && resp.status && resp.status < 300) return resp;
      throw Error("The username or password is incorrect");
    })
    .then(rez => {
      const token = rez.headers.get("authorization");
      dispatch(setToken(token));
      return rez.json();
    })
    .then(rez => {
      dispatch(setUser(rez));
      dispatch(push("/books"));
    })
    .catch(resp => {
      dispatch(loginFailed(resp));
    });
};

const setUser = data => {
  return {
    type: SET_USER,
    data
  };
};

const setToken = token => {
  return {
    type: SET_TOKEN,
    data: token
  };
};

const loginFailed = data => {
  return {
    type: LOGIN_FAILED,
    data
  };
};

const startLogin = () => {
  return {
    type: START_LOGIN
  };
};
