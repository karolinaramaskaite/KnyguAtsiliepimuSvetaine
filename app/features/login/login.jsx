import React from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { loginRequest } from "./actions";
import { connect } from "react-redux";

class Login extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
      username: "",
      password: "",
      error: ""
    };

    this.handleTextInput = this.handleTextInput.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.logUserIn = this.logUserIn.bind(this);
  }

  validatePassword() {
    if (this.state.password.length >= 6) return true;
    else {
      this.setState({
        error: "Slaptažodis turi būti bent 6 simbolių"
      });
      return false;
    }
  }

  validateEmail() {
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!pattern.test(this.state.username)) {
      this.setState({
        error: "Elektroninio pašto sandara neteisinga"
      });
      return false;
    } else return true;
  }

  handleTextInput(e, name) {
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  logUserIn(e) {
    e.preventDefault();
    let username = this.state.username;
    let password = this.state.password;
    if (this.validateEmail() && this.validatePassword()) {
      this.props.loginRequest({ username, password });
      if (!this.props.user.isFetching) {
        this.setState({
          error: "Vartotojo vardas arba slaptažodis yra neteisingas"
        });
      }
    }
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={e => this.logUserIn(e)}>
          <h3
            style={{
              fontFamily: "Courier New",
              color: "#8b4513",
              fontSize: "20px"
            }}
          >
            Vartotojo vardas
          </h3>
          <input
            type="text"
            onChange={e => this.handleTextInput(e, "username")}
          />
          <br />
          <h3
            style={{
              fontFamily: "Courier New",
              color: "#8b4513",
              fontSize: "20px"
            }}
          >
            Slaptažodis
          </h3>
          <input
            type="password"
            onChange={e => this.handleTextInput(e, "password")}
          />
          <br />
          <br />
          <input
            type="submit"
            className="button-login"
            value="Prisijungti"
            onSubmit={e => this.logUserIn(e)}
          />
          <br />
          <br />
          <h3
            style={{
              fontFamily: "Courier New",
              color: "#8b4513",
              fontSize: "14px"
            }}
          >
            <i>
              Neturite paskyros?
              {<Link to="register"> Užsiregistruokite!</Link>}
            </i>
          </h3>
          <h3
            style={{
              fontFamily: "Courier New",
              color: "red",
              fontSize: "14px"
            }}
          >
            <b>{this.state.error}</b>
          </h3>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginRequest: data => {
      dispatch(loginRequest(data));
    }
  };
};

const mapStateToProps = state => ({
  user: state.User,
  isFetching: state.isFetching
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
