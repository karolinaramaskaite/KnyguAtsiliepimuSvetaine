import React from "react";
import { render } from "react-dom";
import Review from "./review";
import * as actionCreators from "./actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class ReviewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      id: props.bookId,
      review: ""
    };

    this.addNewReview = this.addNewReview.bind(this);
    this.reviewForm = this.reviewForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteReview = this.deleteReview.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      reviews: props.reviews
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

  addNewReview(e) {
    e.preventDefault();
    let id = this.state.reviews.length;
    let review = this.state.review;
    let bookId = this.props.bookId;

    if (this.emptyTextValidation(review)) {
      let newReview = {
        id,
        review,
        bookId
      };

      this.props.newReviewRequest(newReview);
    }
    this.setState({
      review: ""
    });
  }

  handleInputChange(e, type) {
    let value = e.target.value;
    this.setState({
      [type]: value
    });
  }

  reviewForm() {
    return (
      <div className="review-item">
        <div className="book">
          <form onSubmit={e => this.addNewReview(e)}>
            <b>Atsiliepimas: </b>
            <br />
            <textarea
              className="text-area"
              value={this.state.review}
              onChange={e => this.handleInputChange(e, "review")}
            />
            <input
              onSubmit={e => this.addNewReview(e)}
              type="submit"
              className="button-add"
              value="Pridėti"
            />
          </form>
        </div>
      </div>
    );
  }

  deleteReview(index, id) {
    let newReviews = this.state.reviews;
    newReviews.splice(index, 1);
    this.setState({
      reviews: newReviews
    });
    this.props.deleteReviewRequest(id);
  }

  render() {
    let newReviewForm = this.reviewForm();
    const reviewList = this.state.reviews.map((review, index) => {
      return (
        <Review
          key={index}
          index={index}
          review={review.review}
          id={review.id}
          name={review.userName}
          surname={review.userSurname}
          date={review.time}
          deleteReview={this.deleteReview}
        />
      );
    });

    return (
      <div className="books">
        {newReviewForm}
        {reviewList}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  newReview: state.newReview,
  id: state.id,
  hasErrored: state.reviewsHaveErrored,
  isLoading: state.reviewsAreLoading
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
