import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";

export const history = createHistory();

const middleware = routerMiddleware(history);

const defaultState = {
  App: {}
};

const enhancers = compose(
  applyMiddleware(thunk, middleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

export default createStore(rootReducer, defaultState, enhancers);
