import {
  NEW_BOOK_SUCCESS,
  SET_BOOK,
  NEW_BOOK_FAILED,
  BOOK_IS_LOADING
} from "../actions";
const defaultState = {
  newBook: null,
  error: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case NEW_BOOK_SUCCESS:
      return { ...state };
    case NEW_BOOK_FAILED:
      return { ...state };
    case BOOK_IS_LOADING:
      return action.isLoading;
    case SET_BOOK:
      const newBook = action.data;
      setNewBook(newBook);
      return { ...state, newBook };
    default:
      return state;
  }
};

const setNewBook = newBook => {
  localStorage.setItem("newBook", JSON.stringify(newBook));
};
