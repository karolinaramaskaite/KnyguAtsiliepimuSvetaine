export const NEW_BOOK_SUCCESS = "NEW_BOOK_SUCCESS ";
export const SET_BOOK = "SET_BOOK";
export const NEW_BOOK_FAILED = "NEW_BOOK_FAILED";
export const BOOK_IS_LOADING = "BOOK_IS_LOADING";
import { getItem } from "../../services/localCache";
import { push } from "react-router-redux";

export const newBookRequest = (data, image) => dispatch => {
  const url = "/api/books";
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
        dispatch(newBookFailed(resp));
      }
      return resp.json();
    })
    .then(rez => {
      dispatch(setBook(rez));
      if (image !== "") {
        saveImage(image);
      } else {
        dispatch(newBookSuccess());
        window.location.reload();
      }
      return rez;
    })
    .catch(resp => {
      dispatch(newBookFailed(resp));
      window.location.reload();
      return resp;
    });
};

export const updateBookRequest = (data, image) => dispatch => {
  const url = "/api/books/" + data.id;
  fetch(url, {
    method: "put",
    headers: {
      authorization: getItem("token"),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(resp => {
      if (resp && resp.status && resp.status > 299) {
        dispatch(updateBookFailed(resp));
      }
      return resp;
    })
    .then(rez => {
      if (image !== "") {
        updateImage(image, data.id);
      } else {
        dispatch(updateBookSuccess());
        window.location.reload();
      }
      return rez;
    })
    .catch(resp => {
      dispatch(updateBookFailed(resp));
      window.location.reload();
      return resp;
    });
};

export const updateImage = (formData, id) => {
  let token = getItem("token");
  fetch("api/books/" + id + "/image", {
    method: "POST",
    headers: {
      authorization: token
    },
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(updateBookSuccess());
      window.location.reload();
    })
    .catch(window.location.reload());
};

export const saveImage = formData => {
  let newBook = JSON.parse(getItem("newBook"));
  let token = getItem("token");
  fetch("api/books/" + newBook.id + "/image", {
    method: "POST",
    headers: {
      authorization: token
    },
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(updateBookSuccess());
      window.location.reload();
    })
    .catch(window.location.reload());
};

export const clearBooks = () => {
  let newValue = [];
  return dispatch => {
    dispatch(booksNoContent(newValue));
  };
};

export const fetchBooks = (start, keyword) => {
  let url;
  if (start === undefined) start = 0;
  if (keyword === undefined) {
    url = "/api/all-books?start=" + start;
  } else {
    url = "/api/all-books?start=" + start + "&search=" + keyword;
  }

  return dispatch => {
    dispatch(booksAreLoading(true));
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
        if (response.status == 204) {
          dispatch(hasMoreBooks(false));
        }
        dispatch(booksAreLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(books => dispatch(booksFetchSuccess(books)))
      .catch(() => dispatch(booksHaveErrored(true)));
  };
};

export const deleteBookRequest = bookId => {
  return dispatch => {
    const url = "/api/books/" + bookId;
    dispatch(booksAreLoading(true));
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
          dispatch(booksAreLoading(false));
        }
        dispatch(booksAreLoading(false));
      })
      .catch(() => dispatch(booksHasErrored(true)));
  };
};

export const booksNoContent = books => {
  return {
    type: "BOOKS_NO_CONTENT",
    books
  };
};

export const bookIsLoading = value => {
  return {
    type: "BOOK_IS_LOADING",
    isLoading: value
  };
};

const newBookSuccess = () => {
  return {
    type: NEW_BOOK_SUCCESS
  };
};

const setBook = data => {
  return {
    type: SET_BOOK,
    data
  };
};

const newBookFailed = data => {
  return {
    type: NEW_BOOK_FAILED,
    data
  };
};

const updateBookSuccess = () => {
  return {
    type: "UPDATE_BOOK_SUCCESS"
  };
};

const updateBookFailed = data => {
  return {
    type: "UPDATE_BOOK_FAILED",
    data
  };
};

export const booksHaveErrored = value => {
  return {
    type: "BOOKS_HAVE_ERRORED",
    hasErrored: value
  };
};

export const booksAreLoading = value => {
  return {
    type: "BOOKS_ARE_LOADING",
    isLoading: value
  };
};

export const booksFetchSuccess = books => {
  return {
    type: "BOOKS_FETCH_SUCCESS",
    books
  };
};

export const hasMoreBooks = value => {
  return {
    type: "EMPTY_BOOK_RESPONSE",
    hasMore: value
  };
};
