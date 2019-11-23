import React from "react";

//className will be a modal
function Room() {
  return (
    <form>
      <input
        type="text"
        placeholder="Enter Your Username"
        name="mainuser"
        value={this.state.mainuser}
        onChange={this.handleInputChange}
      />
    </form>
  );
}

export default Playlist;
