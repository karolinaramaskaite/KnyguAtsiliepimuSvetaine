import React from "react";
import booksData from "./books-data";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import BookList from "./book-list";
import { Link } from "react-router-dom";

class Books extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
      showModal: false,
      data: {},
      id: -1
    };

    this.handleClose = this.handleClose.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  render() {
    let modal = this.renderModal();
    return (
      <div>
        <BookList handleOpen={this.handleOpen} />
        {modal}
      </div>
    );
  }

  renderModal() {
    if (this.state.showModal) {
      return (
        <ModalContainer onClose={this.handleClose}>
          <ModalDialog onClose={this.handleClose}>
            <p style={{ width: "500px" }}>
              <b>Aprašymas: </b>
              {this.state.data}
            </p>
            <Link to={"/book-page?id=" + this.state.id} className="logo">
              <button
                className="button"
                onClick={() => {
                  this.handleClose();
                }}
              >
                <i style={{ color: "#f5deb3" }}> Knygos puslapis</i>
              </button>
            </Link>
          </ModalDialog>
        </ModalContainer>
      );
    } else return;
  }

  handleOpen(data, id) {
    this.setState({ showModal: true, data: data, id: id });
  }

  handleClose() {
    this.setState({ showModal: false, data: "", id: -1 });
  }
}

export default Books;
