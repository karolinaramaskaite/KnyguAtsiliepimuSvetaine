import { getItem } from "../../services/localCache";
import { push } from "react-router-redux";

export const fetchBook = bookId => {
  const url = "/api/book/" + bookId;
  return dispatch => {
    dispatch(bookIsLoading(true));
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
        dispatch(bookIsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(book => dispatch(bookFetchSuccess(book)))
      .catch(() => dispatch(bookHasErrored(true)));
  };
};

export const fetchReviews = bookId => {
  let newValue = [];
  const url = "/api/reviews/" + bookId;
  return dispatch => {
    dispatch(reviewsNoContent(newValue));
    dispatch(reviewsAreLoading(true));
    fetch(url, {
      method: "GET",
      headers: {
        authorization: getItem("token"),
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok && response.status > 299) {
          throw Error(response.statusText);
        }
        dispatch(reviewsAreLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(reviews => dispatch(reviewsFetchSuccess(reviews)))
      .catch(() => dispatch(reviewsHaveErrored(true)));
  };
};

export const deleteReviewRequest = reviewId => {
  return dispatch => {
    const url = "/api/reviews/" + reviewId;
    dispatch(reviewsAreLoading(true));
    fetch(url, {
      method: "DELETE",
      headers: {
        authorization: getItem("token"),
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
          dispatch(reviewsAreLoading(false));
        }
        dispatch(reviewsAreLoading(false));
      })
      .catch(() => dispatch(reviewsHaveErrored(true)));
  };
};

export const newReviewRequest = data => dispatch => {
  const url = "/api/reviews";
  fetch(url, {
    method: "post",
    headers: {
      authorization: getItem("token"),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(resp => {
      if (resp && resp.status && resp.status > 299) {
        dispatch(newReviewFailed(resp));
      }
      return resp.json();
    })
    .then(rez => {
      dispatch(setReview(rez));
      dispatch(newReviewSuccess());
      window.location.reload();
    })
    .catch(() => {
      window.location.reload();
    });
};

const updateAuthorSuccess = () => {
  return {
    type: UPDATE_AUTHOR_SUCCESS
  };
};

const updateAuthorFailed = data => {
  return {
    type: UPDATE_AUTHOR_FAILED,
    data
  };
};

const newReviewSuccess = () => {
  return {
    type: NEW_REVIEW_SUCCESS
  };
};

const setReview = data => {
  return {
    type: SET_REVIEW,
    data
  };
};

const newReviewFailed = data => {
  return {
    type: NEW_REVIEW_FAILED,
    data
  };
};

export const bookHasErrored = value => {
  return {
    type: "BOOK_HAS_ERRORED",
    hasErrored: value
  };
};

export const bookIsLoading = value => {
  return {
    type: "BOOK_IS_LOADING",
    isLoading: value
  };
};

export const bookFetchSuccess = book => {
  return {
    type: "BOOK_FETCH_SUCCESS",
    book
  };
};

export const reviewsHaveErrored = value => {
  return {
    type: "REVIEWS_HAVE_ERRORED",
    hasErrored: value
  };
};

export const reviewsAreLoading = value => {
  return {
    type: "REVIEWS_ARE_LOADING",
    isLoading: value
  };
};

export const reviewsFetchSuccess = reviews => {
  return {
    type: "REVIEWS_FETCH_SUCCESS",
    reviews
  };
};

export const reviewsNoContent = reviews => {
  return {
    type: "REVIEWS_NO_CONTENT",
    reviews
  };
};
