import { combineReducers } from "redux";
import User from "../features/login/reducer";
import App from "../features/App/reducers";
import newBook from "../features/books/reducers/new-book";
import { routerReducer } from "react-router-redux";
import {
  books,
  booksAreLoading,
  booksHaveErrored,
  hasMore,
  updateBook
} from "../features/books/reducers/book";
import newAuthor from "../features/authors/reducers/new-author";
import {
  authors,
  authorsAreLoading,
  authorsHaveErrored
} from "../features/authors/reducers/author";
import { hasMore as hasMoreAuthors } from "../features/authors/reducers/author";
import {
  book,
  bookIsLoading,
  bookHasErrored
} from "../features/book-page/reducers/book";
import {
  reviews,
  reviewsAreLoading,
  reviewsHaveErrored
} from "../features/book-page/reducers/review";
import newReview from "../features/book-page/reducers/new-review";
import {
  profile,
  profileIsLoading,
  profileHasErrored
} from "../features/profile/reducers/profile";
import { hasMoreBooks } from "../features/books/actions";

export default combineReducers({
  App,
  User,
  newBook,
  books,
  booksAreLoading,
  booksHaveErrored,
  hasMore,
  updateBook,
  newAuthor,
  authors,
  authorsAreLoading,
  authorsHaveErrored,
  hasMoreAuthors,
  book,
  bookIsLoading,
  bookHasErrored,
  reviews,
  reviewsAreLoading,
  reviewsHaveErrored,
  newReview,
  profile,
  profileIsLoading,
  profileHasErrored
});
