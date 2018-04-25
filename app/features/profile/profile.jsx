import React from "react";
import EditIcon from "../../images/edit.png";
import Icon from "../../images/profile-icon.png";
import * as actionCreators from "./actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      id: "",
      name: "",
      surname: "",
      email: "",
      type: "",
      password: "",
      oldPassword: "",
      newPassword: "",
      passwordRepeat: ""
    };

    this.editProfileForm = this.editProfileForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.edit = this.edit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.props.fetchProfile();
  }

  componentWillReceiveProps(props) {
    let user;
    props.profile.map(prof => {
      user = prof;
    });
    this.setState({
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: user.password,
      type: user.type
    });
  }

  editProfile() {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  emptyTextValidation = text => {
    if (!text) return false;
    let count = 0;
    for (let i in text) {
      if (text[i] === " " || text[i] === "\n") {
        count++;
      }
    }
    if (count === text.length) return false;
    else return true;
  };

  validatePassword() {
    if (
      this.state.newPassword.length >= 6 &&
      this.state.password === encodeURIComponent(this.state.oldPassword) &&
      this.state.newPassword === this.state.passwordRepeat
    )
      return true;
    else return false;
  }

  validateEmail() {
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!pattern.test(this.state.email)) {
      return false;
    } else return true;
  }

  edit(e) {
    e.preventDefault();
    let id = this.state.id;
    let name = this.state.name;
    let surname = this.state.surname;
    let email = this.state.email;
    let reviews = this.state.reviews;
    let type = this.state.type;
    if (
      this.emptyTextValidation(name) &&
      this.emptyTextValidation(surname) &&
      this.validateEmail()
    ) {
      if (this.validatePassword) {
        let password = this.state.newPassword;
        let user = {
          id,
          name,
          surname,
          email,
          type,
          password
        };
        this.props.updateProfileRequest(user);
      } else {
        let user = {
          id,
          name,
          surname,
          email,
          type
        };
        this.props.updateProfileRequest(user);
      }
      //iskviecia actiona
      this.setState({
        showForm: false
      });
    }
  }

  handleInputChange(e, type) {
    let value = e.target.value;
    this.setState({
      [type]: value
    });
  }

  editProfileForm() {
    return (
      <div className="book-item">
        <div className="book">
          <form onSubmit={e => this.edit(e)}>
            <table>
              <tr>
                <td>
                  <b>Vardas: </b>
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.name}
                    onChange={e => this.handleInputChange(e, "name")}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <b>Pavardė: </b>
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.surname}
                    onChange={e => this.handleInputChange(e, "surname")}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <b>Senas slaptažodis: </b>
                </td>
                <td>
                  <input
                    type="password"
                    onChange={e => this.handleInputChange(e, "oldPassword")}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <b>Naujas slaptažodis: </b>
                </td>
                <td>
                  <input
                    type="password"
                    onChange={e => this.handleInputChange(e, "newPassword")}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <b>Pakartoti slaptažodį: </b>
                </td>
                <td>
                  <input
                    type="password"
                    onChange={e => this.handleInputChange(e, "passwordRepeat")}
                  />
                </td>
              </tr>
            </table>
            <input
              onSubmit={e => this.edit(e)}
              type="submit"
              className="button-add"
              value="Redaguoti"
            />
          </form>
        </div>
      </div>
    );
  }

  render() {
    let editProfileForm;
    if (this.state.showForm) {
      editProfileForm = this.editProfileForm();
    } else editProfileForm = "";
    return (
      <div className="books" style={{ backgroundColor: "#f5deb3" }}>
        <img
          src={EditIcon}
          style={{ height: "25px", float: "right", paddingLeft: "65%" }}
          onClick={() => this.editProfile()}
        />
        <div className="book-item" style={{ justifyContent: "space-evenly" }}>
          <img src={Icon} className="book-image" />
          <div className="book" style={{ paddingTop: "10%" }}>
            <p>
              <b>Vardas: </b>
              <i>{this.state.name}</i>
            </p>
            <p>
              <b>Pavardė: </b>
              <i>{this.state.surname}</i>
            </p>
            <p>
              <b>El. paštas: </b>
              <i>{this.state.email}</i>
            </p>
            <p>
              <b>Tipas: </b>
              <i>{this.state.type}</i>
            </p>
          </div>
        </div>
        {editProfileForm}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  profile: state.profile,
  hasErrored: state.booksHaveErrored,
  isLoading: state.booksAreLoading
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
