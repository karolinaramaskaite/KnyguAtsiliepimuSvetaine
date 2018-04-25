import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getItem } from "../../services/localCache";
import Logo from "../../images/book5.png";
import ProfileLogo from "../../images/profile-icon3.png";
import * as actionCreators from "./actions";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      search: "control",
      books: "control",
      authors: "control",
      name: "",
      logInOrOut: "",
      link: ""
    };

    this.onButtonClicked = this.onButtonClicked.bind(this);
    this.setDefaultState = this.setDefaultState.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      name: props.user,
      logInOrOut: props.login,
      link: props.link
    });
  }

  componentWillMount() {
    if (!this.unMount) {
      document.addEventListener(
        "click",
        this.handleClickOutside.bind(this),
        true
      );
    }
    this.setState({
      name: this.props.user,
      logInOrOut: this.props.login,
      link: this.props.link
    });
  }

  componentWillUnmount() {
    this.unMount = true;
    document.removeEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }

  onLogoutClick() {
    this.setState({ link: "/login", logInOrOut: "Prisijungti", name: "" });
    this.props.logOut();
  }

  handleClickOutside(event) {
    const domNode = ReactDOM.findDOMNode(this);

    if (!domNode || !domNode.contains(event.target)) {
      this.setDefaultState();
    }
  }

  setDefaultState() {
    this.setState({
      search: "control",
      books: "control",
      authors: "control"
    });
  }

  onButtonClicked(name) {
    if (this.state[name] === "control opened") {
      this.setDefaultState();
    } else {
      this.setDefaultState();
      this.setState({
        [name]: "control opened"
      });
    }
    if (name === "/logout") {
      this.onLogoutClick();
    }
  }

  render() {
    return (
      <header className="page-header" role="banner">
        <div className="page-frame">
          <Link to="/books" className="logo">
            <div>
              <p
                style={{
                  fontFamily: "Courier New",
                  color: "white",
                  fontSize: "20px"
                }}
              >
                Knygų atsiliepimų svetainė
                <img src={Logo} />
              </p>
            </div>
          </Link>
          <div className="user-controls">
            <p
              style={{
                fontFamily: "Courier New",
                color: "#f5deb3",
                fontSize: "15px",
                paddingTop: "20px"
              }}
            >
              {this.state.name}
            </p>
            <Link to="/my-profile" className="logo">
              <img
                src={ProfileLogo}
                style={{ height: "30px", paddingTop: "10px" }}
              />
            </Link>
            <Link to={this.state.link} className="logo">
              <p
                style={{
                  fontFamily: "Courier New",
                  color: "white",
                  fontSize: "20px",
                  paddingTop: "15px"
                }}
                onClick={() => {
                  this.onButtonClicked(this.state.link);
                }}
              >
                {this.state.logInOrOut}
              </p>
            </Link>
          </div>
          <nav className="main-nav">
            <ul>
              <li>
                <Link to="/books">Knygos</Link>
              </li>
              <li>
                <Link to="/authors">Autoriai</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(null, mapDispatchToProps)(Header);
