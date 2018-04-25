import React from "react";
import Header from "../common/header";
import Books from "../books/get-books";
import Book from "../book-page/book-page";
import Authors from "../authors/get-authors";
import Login from "../login/login";
import Profile from "../profile/profile";
import Registration from "../registration/registration";
import { Route, Switch } from "react-router-dom";
import * as actionCreators from "../../actions/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getItem } from "../../services/localCache";
import { Redirect } from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: "",
      token: ""
    };
  }

  render() {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (token) {
      return (
        <div>
          <Header user={user.email} login={"Atsijungti"} link={"/logout"} />
          <Switch>
            <Route path="/authors" component={Authors} />
            <Route path="/my-profile" component={Profile} />
            <Route path="/book-page" component={Book} />
            <Route path="/books" component={Books} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" component={Registration} />
            <Route component={Books} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div>
          <Header user={""} login={"Prisijungti"} link={"/login"} />
          <Switch>
            <Route path="/books" component={Books} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" component={Registration} />
            <Route component={Login} />
          </Switch>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.User.user
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
