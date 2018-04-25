import React from "react";
import { render } from "react-dom";
import Book from "./book";
import * as actionCreators from "./actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getItem } from "../../services/localCache";
import InfiniteScroll from "react-infinite-scroller";
import SearchIcon from "../../images/search.png";

var shortid = require("shortid");

class BookList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      id: "",
      title: "",
      image: "",
      author: "",
      about: "",
      year: "",
      isbn: "",
      showForm: false,
      file: "",
      page: 1,
      search: "",
      searchSubmit: false
    };

    this.modalOpen = this.modalOpen.bind(this);
    this.addNewBook = this.addNewBook.bind(this);
    this.addBookForm = this.addBookForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.defaultNewBook = this.defaultNewBook.bind(this);
    this.showBookForm = this.showBookForm.bind(this);
    this.editBook = this.editBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.searchForm = this.searchForm.bind(this);
    this.search = this.search.bind(this);
    this.props.clearBooks();
    this.props.fetchBooks();
  }

  componentWillReceiveProps(props) {
    this.setState({
      books: props.books
    });
  }

  modalOpen(id) {
    let b = "";
    this.state.books.map(book => {
      if (book.id === id) {
        b = book.about;
      }
    });
    this.props.handleOpen(b, id);
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

  addNewBook(e) {
    e.preventDefault();
    let title = this.state.title;
    let image = this.state.image;
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
      let newBook = {
        title,
        author,
        about,
        year,
        isbn
      };

      this.props.newBookRequest(newBook, image);
    }
    this.defaultNewBook();
  }

  handleInputChange(e, type) {
    let value = e.target.value;
    this.setState({
      [type]: value
    });
  }

  defaultNewBook() {
    this.setState({
      id: "",
      title: "",
      image: "",
      author: "",
      about: "",
      year: "",
      isbn: "",
      showForm: false
    });
  }

  addPhoto = e => {
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    this.setState({ image: formData });
  };

  addBookForm() {
    return (
      <div className="book-item">
        <div className="book">
          <form onSubmit={e => this.addNewBook(e)}>
            <table>
              <tr>
                <td>
                  <b>Autorius: </b>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Vardas ir pavardė"
                    onChange={e => this.handleInputChange(e, "author")}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <b>Pavadinimas: </b>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Pavadinimas"
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
                  />
                </td>
              </tr>
            </table>
            <input type="file" onChange={e => this.addPhoto(e)} />
            <input
              onSubmit={e => this.addNewBook(e)}
              type="submit"
              className="button-add"
              value="Pridėti"
            />
          </form>
        </div>
      </div>
    );
  }

  showBookForm() {
    this.setState({
      showForm: true
    });
  }

  editBook(id, newData, image) {
    this.props.updateBookRequest(newData, image);
    this.setState({
      books: this.state.books.map((book, index) => {
        if (book.id === id) {
          book = newData;
        }
        return book;
      })
    });
  }

  deleteBook(index, id) {
    let newBooks = this.state.books;
    newBooks.splice(index, 1);
    this.setState({
      books: newBooks
    });
    this.props.deleteBookRequest(id);
  }

  loadMore = page => {
    if (!this.props.isLoading && this.props.hasMore) {
      if (!this.state.searchSubmit || !this.state.search.length > 0) {
        this.props.fetchBooks(this.state.page * 20);
        page = this.state.page + 1;
        this.setState({ page: page });
      }
    }
  };

  search() {
    this.props.clearBooks();
    this.setState({
      searchSubmit: true,
      page: 1
    });
    this.props.fetchBooks(0, this.state.search);
    this.setState({
      search: ""
    });
  }

  searchForm() {
    return (
      <div className="book-item" style={{ height: "auto" }}>
        <div
          style={{
            paddingLeft: "50px",
            marginTop: "50px",
            marginBottom: "50px"
          }}
        >
          <input
            type="text"
            style={{ width: "400px" }}
            placeholder="Ieškokite pagal autorių, pavadinimą, ISBN kodą ar metus"
            value={this.state.search}
            onChange={e => this.handleInputChange(e, "search")}
          />
          <img
            src={SearchIcon}
            style={{ height: "20px", float: "right" }}
            onClick={() => {
              this.search();
            }}
          />
        </div>
      </div>
    );
  }

  render() {
    let user = JSON.parse(localStorage.getItem("user"));
    let addButton = "";
    if (user) {
      addButton = (
        <button
          className="button-add"
          onClick={() => {
            this.showBookForm();
          }}
        >
          <i style={{ color: "#f5deb3" }}>Pridėti knygą</i>
        </button>
      );
    }
    let spinner = "";
    if (this.props.isLoading) spinner = <span className="spinner" />;
    let newBookForm;
    if (this.state.showForm) {
      newBookForm = this.addBookForm();
    } else newBookForm = "";
    let books = this.props.books;
    let searchForm = this.searchForm();
    const bookList = this.state.books.map((book, index) => {
      return (
        <Book
          key={index}
          title={book.title}
          id={book.id}
          index={index}
          author={book.author}
          year={book.year}
          about={book.about}
          image={book.image}
          isbn={book.isbn}
          modalOpen={this.modalOpen}
          editBook={this.editBook}
          deleteBook={this.deleteBook}
        />
      );
    });

    return (
      <div className="books">
        {spinner}
        {searchForm}
        {addButton}
        {newBookForm}
        <InfiniteScroll
          pageStart={1}
          initialLoad={false}
          loadMore={this.loadMore}
          hasMore={this.props.hasMore && !this.props.isLoading}
          loader={
            this.props.isLoading ? <span className="spinner" /> : <span />
          }
          threshold={350}
          useCapture={true}
        >
          {bookList}
        </InfiniteScroll>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  books: state.books,
  newBook: state.newBook,
  hasErrored: state.booksHaveErrored,
  isLoading: state.booksAreLoading,
  hasMore: state.hasMore
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
