import {
  SET_USER,
  REGISTRATION_FAILED,
  REGISTRATION_SUCCESS,
  SET_TOKEN
} from "./actions";
const defaultState = {
  user: {},
  error: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case REGISTRATION_SUCCESS:
      return { ...state, error: null, isFetching: false };
    case REGISTRATION_FAILED:
      return { ...state, error: action.data };
    case SET_USER:
      const user = action.data;
      setUser(user);
      return { ...state, user, error: null, isFetching: false };
    case SET_TOKEN:
      setToken(action.data);
      return state;
    default:
      return state;
  }
};

const setToken = token => {
  localStorage.setItem("token", token);
};

const setUser = user => {
  localStorage.setItem("user", JSON.stringify(user));
};
