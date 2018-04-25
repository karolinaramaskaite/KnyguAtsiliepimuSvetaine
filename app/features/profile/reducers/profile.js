export function profileHasErrored(state = false, action) {
  switch (action.type) {
    case "PROFILE_HAVE_ERRORED":
      return action.hasErrored;
    default:
      return state;
  }
}

export function profileIsLoading(state = false, action) {
  switch (action.type) {
    case "PROFILE_ARE_LOADING":
      return action.isLoading;

    default:
      return state;
  }
}

export function profile(state = [], action) {
  switch (action.type) {
    case "PROFILE_FETCH_SUCCESS":
      return [...state, action.profile];
    default:
      return state;
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER:
      const user = action.data;
      setUser(user);
      return { ...state, user, error: null, isFetching: false };
    case UPDATE_PROFILE_SUCCESS:
      return { ...state };
    case UPDATE_PROFILE_FAILED:
      return { ...state };
    default:
      return state;
  }
};

const setUser = user => {
  localStorage.setItem("user", JSON.stringify(user));
};
