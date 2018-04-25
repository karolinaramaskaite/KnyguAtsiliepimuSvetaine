export default (state = [], action) => {
  switch (action.type) {
    case "SET_LOGIN_ERRORS":
      return {
        ...state,
        error: action.payload.error
      };
    case "LOGOUT_USER":
      return {
        ...state,
        user: null
      };
      break;
    default:
      return state;
  }
};
