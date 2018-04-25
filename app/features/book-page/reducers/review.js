export function reviewsHaveErrored(state = false, action) {
  switch (action.type) {
    case "REVIEWS_HAVE_ERRORED":
      return action.hasErrored;
    default:
      return state;
  }
}

export function reviewsAreLoading(state = false, action) {
  switch (action.type) {
    case "REVIEWS_ARE_LOADING":
      return action.isLoading;

    default:
      return state;
  }
}

export function reviews(state = [], action) {
  switch (action.type) {
    case "REVIEWS_FETCH_SUCCESS":
      return [...state, ...action.reviews];
    case "REVIEWS_NO_CONTENT":
      return [...action.reviews];
    default:
      return state;
  }
}
