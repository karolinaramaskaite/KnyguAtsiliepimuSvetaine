import {
  NEW_REVIEW_SUCCESS,
  SET_REVIEW,
  NEW_REVIEW_FAILED,
  REVIEW_IS_LOADING
} from "../actions";
const defaultState = {
  newReview: null,
  error: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case NEW_REVIEW_SUCCESS:
      return { ...state };
    case NEW_REVIEW_FAILED:
      return { ...state };
    case REVIEW_IS_LOADING:
      return action.isLoading;
    case SET_REVIEW:
      const newReview = action.data;
      setNewReview(newReview);
      return { ...state, newAuthor };
    default:
      return state;
  }
};

const setNewReview = newReview => {
  localStorage.setItem("newReview", JSON.stringify(newReview));
};
