import { getItem } from "../../services/localCache";
import { push } from "react-router-redux";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const SET_USER = "SET_USER";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";
export const SET_TOKEN = "SET_TOKEN";

export const registrationRequest = data => dispatch => {
  const url = `/api/profiles`;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(resp => {
      const token = resp.headers.get("authorization");
      dispatch(setToken(token));

      return resp.json();
    })
    .then(resp => {
      if (resp && resp.status && resp.status > 299) {
        throw Error(resp.message);
      } else {
        dispatch(setUser(resp));
        dispatch(push("/books"));
        dispatch(registrationSuccess());
      }
    })
    .catch(err => {
      dispatch(registrationFailed(err.message));
    });
};

const registrationSuccess = () => {
  return {
    type: REGISTRATION_SUCCESS
  };
};

const setUser = data => {
  return {
    type: SET_USER,
    data
  };
};

const registrationFailed = data => {
  return {
    type: REGISTRATION_FAILED,
    data
  };
};

const setToken = token => {
  return {
    type: SET_TOKEN,
    data: token
  };
};
