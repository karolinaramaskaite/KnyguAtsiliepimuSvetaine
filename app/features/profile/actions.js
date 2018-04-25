export const SET_PROFILE = "SET_PROFILE";
export const PROFILE_IS_LOADING = "PROFILE_IS_LOADING";
import { getItem } from "../../services/localCache";
import { push } from "react-router-redux";

export const fetchProfile = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  const url = "/api/profiles/" + user.id;
  return dispatch => {
    dispatch(profileIsLoading(true));
    fetch(url, {
      method: "GET",
      headers: {
        authorization: getItem("token"),
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(profileIsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(profile => dispatch(profileFetchSuccess(profile)))
      .catch(() => dispatch(profileHasErrored(true)));
  };
};

export const updateProfileRequest = data => dispatch => {
  const url = "/api/profiles/" + data.id;
  fetch(url, {
    method: "put",
    headers: {
      authorization: getItem("token"),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(resp => {
      if (resp && resp.status && resp.status > 299) {
        dispatch(updateProfileFailed(resp));
      }
      return resp.json();
    })
    .then(rez => {
      dispatch(setUser(rez));
      dispatch(updateProfileSuccess());
      return rez;
    })
    .catch(resp => {
      dispatch(updateProfileFailed(resp));
      return resp;
    });
};

const setUser = data => {
  return {
    type: "SET_USER",
    data
  };
};

export const profileHasErrored = value => {
  return {
    type: "PROFILE_HAS_ERRORED",
    hasErrored: value
  };
};

export const profileIsLoading = value => {
  return {
    type: "PROFILE_IS_LOADING",
    isLoading: value
  };
};

export const profileFetchSuccess = profile => {
  return {
    type: "PROFILE_FETCH_SUCCESS",
    profile
  };
};

const updateProfileSuccess = () => {
  return {
    type: "UPDATE_PROFILE_SUCCESS"
  };
};

const updateProfileFailed = data => {
  return {
    type: "UPDATE_PROFILE_FAILED",
    data
  };
};
