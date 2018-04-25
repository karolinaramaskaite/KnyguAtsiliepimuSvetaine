import React from "react";
import { parse } from "query-string";
import Reviews from "./review-list";
import * as actionCreators from "./actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class BookPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      parsed: parse(this.props.location.search),
      reviews: [],
      id: "",
      title: "",
      image: "",
      author: "",
      about: "",
      year: "",
      isbn: ""
    };

    this.props.fetchBook(this.state.parsed.id);
    this.props.fetchReviews(this.state.parsed.id);
  }

  componentWillReceiveProps(props) {
    props.book.map(b => {
      this.setState({
        id: b.id,
        title: b.title,
        image: b.image,
        author: b.author,
        about: b.about,
        year: b.year,
        isbn: b.isbn
      });
    });
    this.setState({ reviews: props.reviews });
  }

  render() {
    let spinner = "";
    if (this.props.isLoading) spinner = <span className="spinner" />;
    return (
      <div>
        {spinner}
        <div className="books" style={{ backgroundColor: "#f5deb3" }}>
          <div
            className="book-item"
            style={{
              justifyContent: "space-around",
              height: "auto",
              marginBottom: "50px"
            }}
          >
            <img
              src={"data:image/png;base64," + this.state.image}
              className="book-image"
              style={{ marginTop: "60px" }}
            />
            <div className="book" style={{ paddingTop: "10%" }}>
              <p>
                <b>Autorius: </b>
                <i>{this.state.author}</i>
              </p>
              <p>
                <b>Pavadinimas: </b>
                <i>{this.state.title}</i>
              </p>
              <p>
                <b>Metai: </b>
                <i>{this.state.year}</i>
              </p>
              <p>
                <b>ISBN kodas: </b>
                <i>{this.state.isbn}</i>
              </p>
              <p style={{ width: "400px" }}>
                <b>Aprašymas: </b>
                <i>{this.state.about}</i>
              </p>
            </div>
          </div>
        </div>
        <Reviews bookId={this.state.parsed.id} reviews={this.state.reviews} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reviews: state.reviews,
  book: state.book,
  hasErrored: state.bookHasErrored,
  isLoading: state.bookIsLoading
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);
