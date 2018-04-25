import React from "react";
import DeleteIcon from "../../images/delete.png";
import EditIcon from "../../images/edit.png";

export default class Book extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      id: this.props.id,
      title: this.props.title,
      image: this.props.image,
      author: this.props.author,
      about: this.props.about,
      year: this.props.year,
      isbn: this.props.isbn,
      addNewPhoto: false
    };

    this.editBookForm = this.editBookForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.defaultNewBook = this.defaultNewBook.bind(this);
    this.editBook = this.editBook.bind(this);
    this.edit = this.edit.bind(this);
  }

  editBook() {
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

  edit(e) {
    e.preventDefault();
    let id = this.props.id;
    let title = this.state.title;
    let image = "";
    if (this.state.addNewPhoto) {
      image = this.state.image;
    }
    let author = this.state.author;
    let about = this.state.about;
    let year = this.state.year;
    let isbn = this.state.isbn;
    if (
      this.emptyTextValidation(title) &&
      this.emptyTextValidation(author) &&
      this.emptyTextValidation(about) &&
      this.emptyTextValidation(year) &&
      this.emptyTextValidation(isbn)
    ) {
      let book = {
        id,
        title,
        author,
        about,
        year,
        isbn
      };
      this.props.editBook(id, book, image);
      this.defaultNewBook();
    }
  }

  handleInputChange(e, type) {
    let value = e.target.value;
    this.setState({
      [type]: value
    });
  }

  defaultNewBook() {
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

  editBookForm() {
    return (
      <div className="book-item">
        <div className="book">
          <form onSubmit={e => this.edit(e)}>
            <table>
              <tr>
                <td>
                  <b>Pavadinimas: </b>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Pavadinimas"
                    value={this.state.title}
                    onChange={e => this.handleInputChange(e, "title")}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <b>Išleidimo metai: </b>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Išleidimo metai"
                    value={this.state.year}
                    onChange={e => this.handleInputChange(e, "year")}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <b>ISBN kodas: </b>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="ISBN kodas"
                    value={this.state.isbn}
                    onChange={e => this.handleInputChange(e, "isbn")}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <b>Aprašymas: </b>
                </td>
                <td>
                  <textarea
                    onChange={e => this.handleInputChange(e, "about")}
                    value={this.state.about}
                  />
                </td>
              </tr>
            </table>
            <input type="file" onChange={e => this.addPhoto(e)} />
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
    let editBookForm;
    if (this.state.showForm) {
      editBookForm = this.editBookForm();
    } else editBookForm = "";

    let user = JSON.parse(localStorage.getItem("user"));
    let deleteIcon = "";
    let editIcon = "";
    if (user && user.type === "admin") {
      deleteIcon = (
        <img
          src={DeleteIcon}
          style={{ height: "30px", float: "right" }}
          onClick={() => {
            this.setState({ showForm: false });
            this.props.deleteBook(this.props.index, this.props.id);
          }}
        />
      );

      editIcon = (
        <img
          src={EditIcon}
          style={{ height: "25px", float: "right" }}
          onClick={() => this.editBook()}
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
                <b>Autorius: </b>
                <i>{this.props.author}</i>
              </li>
              <li>
                <b>Pavadinimas: </b>
                <i>{this.props.title}</i>
              </li>
              <li>
                <b>Išleidimo metai: </b>
                <i>{this.props.year}</i>
              </li>
              <li>
                <b>ISBN kodas: </b>
                <i>{this.props.isbn}</i>
              </li>
            </ul>
          </div>
        </div>
        {editBookForm}
      </div>
    );
  }
}
