import { resetAll } from "../../services/localCache";
import { push } from "react-router-redux";

export const logOut = () => dispatch => {
  dispatch({
    type: "LOGOUT_USER"
  });
  resetAll();
  dispatch(push("/books"));
};
