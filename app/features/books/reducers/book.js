export function booksHaveErrored(state = false, action) {
  switch (action.type) {
    case "BOOKS_HAVE_ERRORED":
      return action.hasErrored;
    default:
      return state;
  }
}

export function booksAreLoading(state = false, action) {
  switch (action.type) {
    case "BOOKS_ARE_LOADING":
      return action.isLoading;

    default:
      return state;
  }
}

export function books(state = [], action) {
  switch (action.type) {
    case "BOOKS_FETCH_SUCCESS":
      return [...state, ...action.books];
    case "BOOKS_NO_CONTENT":
      return [...action.books];
    default:
      return state;
  }
}

export function hasMore(state = true, action) {
  switch (action.type) {
    case "EMPTY_BOOK_RESPONSE":
      return action.hasMore;
    default:
      return state;
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_BOOK_SUCCESS:
      return { ...state };
    case UPDATE_BOOK_FAILED:
      return { ...state };
    default:
      return state;
  }
};
