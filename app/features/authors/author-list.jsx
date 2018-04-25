import React from "react";
import { render } from "react-dom";
import Author from "./author";
import * as actionCreators from "./actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { newBookRequest } from "../books/actions";
import InfiniteScroll from "react-infinite-scroller";

class AuthorList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authors: [],
      id: "",
      name: "",
      surname: "",
      biography: "",
      image: "",
      showForm: false,
      page: 1
    };

    this.modalOpen = this.modalOpen.bind(this);
    this.addNewAuthor = this.addNewAuthor.bind(this);
    this.addAuthorForm = this.addAuthorForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.defaultNewAuthor = this.defaultNewAuthor.bind(this);
    this.showAuthorForm = this.showAuthorForm.bind(this);
    this.editAuthor = this.editAuthor.bind(this);
    this.deleteAuthor = this.deleteAuthor.bind(this);
    this.props.clearAuthors();
    this.props.fetchAuthors();
  }

  componentWillReceiveProps(props) {
    this.setState({
      authors: props.authors
    });
  }

  modalOpen(id) {
    let a = "";
    this.state.authors.map(author => {
      if (author.id === id) {
        a = author.biography;
      }
    });
    this.props.handleOpen(a, id);
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

  addNewAuthor(e) {
    e.preventDefault();
    let id = this.state.id;
    let name = this.state.name;
    let biography = this.state.biography;
    let image = this.state.image;
    if (this.emptyTextValidation(name) && this.emptyTextValidation(biography)) {
      let newAuthor = {
        id,
        name,
        biography
      };
      this.props.newAuthorRequest(newAuthor, image);
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
      id: "",
      name: "",
      surname: "",
      biography: "",
      showForm: false
    });
  }

  addPhoto = e => {
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    this.setState({ image: formData });
  };

  addAuthorForm() {
    return (
      <div className="book-item">
        <div className="book">
          <form onSubmit={e => this.addNewAuthor(e)}>
            <table>
              <tr>
                <td>
                  <b>Vardas ir pavardė: </b>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Pilnas vardas"
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
                  />
                </td>
              </tr>
            </table>
            <input type="file" onChange={e => this.addPhoto(e)} />
            <input
              onSubmit={e => this.addNewAuthor(e)}
              type="submit"
              className="button-add"
              value="Pridėti"
            />
          </form>
        </div>
      </div>
    );
  }

  showAuthorForm() {
    this.setState({
      showForm: true
    });
  }

  editAuthor(id, newData, image) {
    this.props.updateAuthorRequest(newData, image);
    this.setState({
      authors: this.state.authors.map((author, index) => {
        if (author.id === id) {
          author = newData;
        }
        return author;
      })
    });
  }

  deleteAuthor(index, id) {
    let newAuthors = this.state.authors;
    newAuthors.splice(index, 1);
    this.setState({
      authors: newAuthors
    });
    this.props.deleteAuthorRequest(id);
  }

  loadMore = page => {
    if (!this.props.isLoading && this.props.hasMore) {
      this.props.fetchAuthors(this.state.page * 20);
      page = this.state.page + 1;
      this.setState({ page: page });
    }
  };

  render() {
    let newAuthorForm;
    let spinner = "";
    if (this.props.isLoading) spinner = <span className="spinner" />;
    if (this.state.showForm) {
      newAuthorForm = this.addAuthorForm();
    } else newAuthorForm = "";
    const authorList = this.state.authors.map((author, index) => {
      return (
        <Author
          key={index}
          id={author.id}
          index={index}
          name={author.name}
          surname={author.surname}
          biography={author.biography}
          modalOpen={this.modalOpen}
          image={author.image}
          editAuthor={this.editAuthor}
          deleteAuthor={this.deleteAuthor}
        />
      );
    });

    return (
      <div className="books">
        {spinner}
        <button
          className="button-add"
          onClick={() => {
            this.showAuthorForm();
          }}
        >
          <i style={{ color: "#f5deb3" }}>Pridėti autorių</i>
        </button>
        {newAuthorForm}
        <InfiniteScroll
          pageStart={1}
          initialLoad={false}
          loadMore={this.loadMore}
          hasMore={this.props.hasMoreAuthors && !this.props.isLoading}
          loader={
            this.props.isLoading ? <span className="spinner" /> : <span />
          }
          threshold={350}
          useCapture={true}
        >
          {authorList}
        </InfiniteScroll>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authors: state.authors,
  newAuthor: state.newAuthor,
  hasErrored: state.authorsHaveErrored,
  isLoading: state.authorsAreLoading,
  hasMore: state.hasMoreAuthors
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthorList);
