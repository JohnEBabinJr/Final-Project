import "./Room.css";
import React from "react";
import Modal from "react-modal";
import Button from "react-bootstrap/Button";

class Room extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

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
        <Button onClick={this.openModal}>Create New Room</Button>
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
            <form class="form-inline">
              <div class="form-group mb-2">
                <label for="nickname" class="sr-only">
                  nickname
                </label>
                <input type="text" id="nickname" value="Nickname" />
              </div>

              <button
                type="submit"
                class="btn btn-primary mb-2"
                id="submitNickname"
              >
                <i class="fas fa-play-circle fa-1x"></i>
              </button>
            </form>
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

export default Room;
