import React from "react";
import DeleteIcon from "../../images/delete.png";
import EditIcon from "../../images/edit.png";

export default class Author extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      name: this.props.name,
      surname: this.props.surname,
      biography: this.props.biography,
      image: this.props.image,
      showForm: false,
      addNewPhoto: false
    };

    this.editAuthor = this.editAuthor.bind(this);
    this.editAuthorForm = this.editAuthorForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.defaultNewAuthor = this.defaultNewAuthor.bind(this);
    this.showAuthorForm = this.showAuthorForm.bind(this);
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

  editAuthor(e) {
    e.preventDefault();
    let id = this.props.id;
    let name = this.state.name;
    let image = "";
    if (this.state.addNewPhoto) {
      image = this.state.image;
    }
    let biography = this.state.biography;
    if (this.emptyTextValidation(name) && this.emptyTextValidation(biography)) {
      let author = {
        id,
        name,
        biography
      };
      this.props.editAuthor(id, author, image);
    }
    this.defaultNewAuthor();
  }

  handleInputChange(e, type) {
    let value = e.target.value;
    this.setState({
      [type]: value
    });
  }

  defaultNewAuthor() {
    this.setState({
      showForm: false,
      addNewPhoto: false
    });
  }

  addPhoto = e => {
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    this.setState({
      image: formData,
      addNewPhoto: true
    });
  };

  editAuthorForm() {
    return (
      <div className="book-item">
        <div className="book">
          <form onSubmit={e => this.editAuthor(e)}>
            <table>
              <tr>
                <td>
                  <b>Vardas: </b>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Vardas"
                    value={this.state.name}
                    onChange={e => this.handleInputChange(e, "name")}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <b>Biografija: </b>
                </td>
                <td>
                  <textarea
                    onChange={e => this.handleInputChange(e, "biography")}
                    value={this.state.biography}
                  />
                </td>
              </tr>
            </table>
            <input type="file" onChange={e => this.addPhoto(e)} />
            <input
              onSubmit={e => this.editAuthor(e)}
              type="submit"
              className="button-add"
              value="Redaguoti"
            />
          </form>
        </div>
      </div>
    );
  }

  showAuthorForm() {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  render() {
    let editAuthorForm;
    if (this.state.showForm) {
      editAuthorForm = this.editAuthorForm();
    } else editAuthorForm = "";

    let user = JSON.parse(localStorage.getItem("user"));
    let deleteIcon = "";
    let editIcon = "";
    if (user.type === "admin") {
      deleteIcon = (
        <img
          src={DeleteIcon}
          style={{ height: "30px", float: "right" }}
          onClick={() => {
            this.setState({ showForm: false });
            this.props.deleteAuthor(this.props.index, this.props.id);
          }}
        />
      );

      editIcon = (
        <img
          src={EditIcon}
          style={{ height: "25px", float: "right" }}
          onClick={() => this.showAuthorForm()}
        />
      );
    }

    return (
      <div>
        {deleteIcon}
        {editIcon}
        <div
          className="book-item"
          onClick={() => this.props.modalOpen(this.props.id)}
        >
          <img
            src={"data:image/png;base64," + this.props.image}
            className="book-image"
          />
          <div className="book">
            <ul>
              <li>
                <b>Pilnas vardas: </b>
                <i>{this.props.name}</i>
              </li>
            </ul>
          </div>
        </div>
        {editAuthorForm}
      </div>
    );
  }
}
