import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./features/App/app";
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
  push
} from "react-router-redux";

import store, { history } from "./store";

import "./styles/styles.css";

import Books from "./features/books/get-books";
import Login from "./features/login/login";
import Registration from "./features/registration/registration";

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={App} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" component={Registration} />
        <Route path="/books" component={Books} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.querySelector(".app")
);
