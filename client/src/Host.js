import "./Room.css";
import React from "react";
import Modal from "react-modal";
import Button from "react-bootstrap/Button";
import {
  authEndpoint,
  clientId,
  redirectUri,
  scopes
} from "./config_example.js";

class Host extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: "",
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {}

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <Button className="userButton" onClick={this.openModal}>
          New Room
        </Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          className="Modal"
          overlayClassName="Overlay"
          contentLabel="Example Modal"
        >
          <Button id="close" onClick={this.closeModal}>
            <i class="fas fa-window-close"></i>
          </Button>
          <div className="content">
            <p>
              Let's get started with a new playlist. Enter a nickname for
              yourself.
            </p>
            {this.props.children}
          </div>
        </Modal>
      </div>
    );
  }
}

export default Host;
