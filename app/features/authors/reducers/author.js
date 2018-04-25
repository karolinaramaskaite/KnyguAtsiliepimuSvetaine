export function authorsHaveErrored(state = false, action) {
  switch (action.type) {
    case "AUTHORS_HAVE_ERRORED":
      return action.hasErrored;
    default:
      return state;
  }
}

export function authorsAreLoading(state = false, action) {
  switch (action.type) {
    case "AUTHORS_ARE_LOADING":
      return action.isLoading;

    default:
      return state;
  }
}

export function authors(state = [], action) {
  switch (action.type) {
    case "AUTHORS_NO_CONTENT":
      return [...action.authors];
    case "AUTHORS_FETCH_SUCCESS":
      return [...state, ...action.authors];
    default:
      return state;
  }
}

export function hasMore(state = true, action) {
  switch (action.type) {
    case "EMPTY_AUTHOR_RESPONSE":
      return action.hasMore;
    default:
      return state;
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_AUTHOR_SUCCESS:
      return { ...state };
    case UPDATE_AUTHOR_FAILED:
      return { ...state };
    default:
      return state;
  }
};
