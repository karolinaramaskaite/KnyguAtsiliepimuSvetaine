export function bookHasErrored(state = false, action) {
  switch (action.type) {
    case "BOOK_HAS_ERRORED":
      return action.hasErrored;
    default:
      return state;
  }
}

export function bookIsLoading(state = false, action) {
  switch (action.type) {
    case "BOOK_IS_LOADING":
      return action.isLoading;

    default:
      return state;
  }
}

export function book(state = [], action) {
  switch (action.type) {
    case "BOOK_FETCH_SUCCESS":
      return [...state, action.book];
    default:
      return state;
  }
}
