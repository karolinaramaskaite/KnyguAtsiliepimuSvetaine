import {
  NEW_AUTHOR_SUCCESS,
  SET_AUTHOR,
  NEW_AUTHOR_FAILED,
  AUTHOR_IS_LOADING
} from "../actions";
const defaultState = {
  newAuthor: null,
  error: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case NEW_AUTHOR_SUCCESS:
      return { ...state };
    case NEW_AUTHOR_FAILED:
      return { ...state };
    case AUTHOR_IS_LOADING:
      return action.isLoading;
    case SET_AUTHOR:
      const newAuthor = action.data;
      setNewAuthor(newAuthor);
      return { ...state, newAuthor };
    default:
      return state;
  }
};

const setNewAuthor = newAuthor => {
  localStorage.setItem("newAuthor", JSON.stringify(newAuthor));
};
