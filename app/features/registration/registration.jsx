import React from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as actionCreators from "./actions";
import { connect } from "react-redux";

class Registration extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
      email: "",
      password: "",
      name: "",
      surname: "",
      passwordRepeat: "",
      type: "vartotojas",
      error: ""
    };

    this.handleTextInput = this.handleTextInput.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  validatePassword() {
    if (this.state.password.length >= 6) {
      if (this.state.password === this.state.passwordRepeat) {
        return true;
      } else {
        this.setState({
          error: "Slaptažodžiai nesutampa"
        });
        return false;
      }
    } else {
      this.setState({
        error: "Slaptažodis yra per trumpas"
      });
      return false;
    }
  }

  validateEmail() {
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!pattern.test(this.state.email)) {
      this.setState({
        error: "Elektroninio pašto sandara yra neteisinga"
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

  registerUser(e) {
    e.preventDefault();
    let email = this.state.email;
    let password = this.state.password;
    let name = this.state.name;
    let surname = this.state.surname;
    let type = "vartotojas";
    if (this.validateEmail() && this.validatePassword()) {
      let newUser = {
        email,
        password,
        name,
        surname,
        type
      };
      this.props.registrationRequest(newUser);
      this.setState({
        error: "Elektroninio pašto adresas gali būti užimtas"
      });
    }
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={e => this.registerUser(e)}>
          <h3
            style={{
              fontFamily: "Courier New",
              color: "#8b4513",
              fontSize: "20px"
            }}
          >
            Vardas
          </h3>
          <input type="text" onChange={e => this.handleTextInput(e, "name")} />
          <br />
          <h3
            style={{
              fontFamily: "Courier New",
              color: "#8b4513",
              fontSize: "20px"
            }}
          >
            Pavardė
          </h3>
          <input
            type="text"
            onChange={e => this.handleTextInput(e, "surname")}
          />
          <br />
          <h3
            style={{
              fontFamily: "Courier New",
              color: "#8b4513",
              fontSize: "20px"
            }}
          >
            El. paštas
          </h3>
          <input type="text" onChange={e => this.handleTextInput(e, "email")} />
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
          <h3
            style={{
              fontFamily: "Courier New",
              color: "#8b4513",
              fontSize: "20px"
            }}
          >
            Pakartokite slaptažodį
          </h3>
          <input
            type="password"
            onChange={e => this.handleTextInput(e, "passwordRepeat")}
          />
          <br />
          <br />
          <input
            type="submit"
            className="button-login"
            value="Registruotis"
            onSubmit={e => this.registerUser(e)}
          />
          <br />
          <br />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  registrationError: state.User.error
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
