import React from "react";
import authorsData from "./authors-data";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import AuthorList from "./author-list";
import { Link } from "react-router-dom";

class Author extends React.Component {
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
        <AuthorList handleOpen={this.handleOpen} />
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
              <b>Biografija: </b>
              {this.state.data}
            </p>
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

export default Author;
