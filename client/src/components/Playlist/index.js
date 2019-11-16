import React from "react";

function Playlist() {
  return (
    <div className="playlist">
      <form>
        <input
          type="text"
          placeholder="Album"
          name="tempAlbum"
          value={this.state.tempAlbum}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleFormSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default Playlist;
