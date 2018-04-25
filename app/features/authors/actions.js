export const NEW_AUTHOR_SUCCESS = "NEW_AUTHOR_SUCCESS ";
export const SET_AUTHOR = "SET_AUTHOR";
export const NEW_AUTHOR_FAILED = "NEW_AUTHOR_FAILED";
export const AUTHOR_IS_LOADING = "AUTHOR_IS_LOADING";
import { getItem } from "../../services/localCache";
import { push } from "react-router-redux";

export const clearAuthors = () => {
  let newValue = [];
  return dispatch => {
    dispatch(authorsNoContent(newValue));
  };
};

export const newAuthorRequest = (data, image) => dispatch => {
  const url = "/api/authors";
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
        dispatch(newAuthorFailed(resp));
      }
      return resp.json();
    })
    .then(rez => {
      dispatch(setAuthor(rez));
      if (image !== "") {
        saveImage(image);
      } else {
        dispatch(newAuthorSuccess());
        window.location.reload();
      }
    })
    .catch(resp => {
      dispatch(newAuthorFailed(resp));
      window.location.reload();
    });
};

export const updateAuthorRequest = (data, image) => dispatch => {
  const url = "/api/authors/" + data.id;
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
        dispatch(updateAuthorFailed(resp));
      }
      return resp;
    })
    .then(rez => {
      if (image !== "") {
        updateImage(image, data.id);
      } else {
        dispatch(updateAuthorSuccess());
        window.location.reload();
      }
      return rez;
    })
    .catch(resp => {
      dispatch(updateAuthorFailed(resp));
      window.location.reload();
      return resp;
    });
};

export const updateImage = (formData, id) => {
  let token = getItem("token");
  fetch("api/authors/" + id + "/image", {
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
      dispatch(updateAuthorSuccess());
      window.location.reload();
    })
    .catch(window.location.reload());
};

export const saveImage = formData => {
  let newAuthor = JSON.parse(getItem("newAuthor"));
  let token = getItem("token");
  fetch("api/authors/" + newAuthor.id + "/image", {
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
      dispatch(newAuthorSuccess());
      window.location.reload();
    })
    .catch(window.location.reload());
};

export const fetchAuthors = start => {
  if (start === undefined) start = 0;
  const url = "/api/authors?start=" + start;
  return dispatch => {
    dispatch(authorsAreLoading(true));
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
          dispatch(hasMoreAuthors(false));
        }
        dispatch(authorsAreLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(authors => dispatch(authorsFetchSuccess(authors)))
      .catch(() => dispatch(authorsHaveErrored(true)));
  };
};

export const deleteAuthorRequest = authorId => {
  return dispatch => {
    const url = "/api/authors/" + authorId;
    dispatch(authorsAreLoading(true));
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
          dispatch(authorsAreLoading(false));
        }
        dispatch(authorsAreLoading(false));
      })
      .catch(() => dispatch(authorsHasErrored(true)));
  };
};

export const authorsNoContent = authors => {
  return {
    type: "AUTHORS_NO_CONTENT",
    authors
  };
};

export const authorIsLoading = value => {
  return {
    type: "AUTHOR_IS_LOADING",
    isLoading: value
  };
};

const newAuthorSuccess = () => {
  return {
    type: NEW_AUTHOR_SUCCESS
  };
};

const setAuthor = data => {
  return {
    type: SET_AUTHOR,
    data
  };
};

const newAuthorFailed = data => {
  return {
    type: NEW_AUTHOR_FAILED,
    data
  };
};

export const authorsHaveErrored = value => {
  return {
    type: "AUTHORS_HAVE_ERRORED",
    hasErrored: value
  };
};

export const authorsAreLoading = value => {
  return {
    type: "AUTHORS_ARE_LOADING",
    isLoading: value
  };
};

export const authorsFetchSuccess = authors => {
  return {
    type: "AUTHORS_FETCH_SUCCESS",
    authors
  };
};

export const hasMoreAuthors = value => {
  return {
    type: "EMPTY_AUTHOR_RESPONSE",
    hasMore: value
  };
};
