import "./Room.css";
import React from "react";
import Modal from "react-modal";
import Button from "react-bootstrap/Button";
import {
  guestEndpoint,
  guestId,
  guestUri,
  guestScopes
} from "./guest_config.js";

class Guest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      roomId: "",
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
    event.preventDefault();
    this.getSong(this.state.token);
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
        <Button onClick={this.openModal}>Guest</Button>
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
            <p>Let's get you started. Enter a nickname for yourself.</p>
            {this.props.children}
          </div>
        </Modal>
      </div>
    );
  }
}

// <div className="form-inline">
//   <h6>Enter ur username</h6>
//   <div id="room-form" className="form-inline">
//     <div id="room-input">
//       <label for="username"></label>
//       <input
//         type="text"
//         class="form-control"
//         id="username"
//         placeholder="enter ur name (edit this in room.js)"
//       />
//     </div>

//     <button type="submit" class="btn btn-primary" id="room-btn">
//       Create New Room
//     </button>
//   </div>
// </div>

export default Guest;
