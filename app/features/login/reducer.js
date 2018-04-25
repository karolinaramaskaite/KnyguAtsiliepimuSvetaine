import {
  SET_USER,
  SET_NEW_USER,
  SET_TOKEN,
  LOGIN_FAILED,
  START_LOGIN
} from "./actions";
const defaultState = {
  user: {},
  error: null,
  isFetching: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_FAILED:
      return { ...state, error: action.data, isFetching: false };
    case SET_USER:
      const user = action.data;
      setUser(user);
      return { ...state, user, error: null };
    case SET_TOKEN:
      setToken(action.data);
      return state;
    case START_LOGIN:
      return { ...state, isFetching: true };
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
