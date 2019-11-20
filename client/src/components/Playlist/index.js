import React from "react";

const Playlist = props => {
  return (
    <div>
      <tr>
        <th>Track</th>
        <th>Artist</th>
        <th>Album</th>
        <th>Added By</th>
      </tr>
      {props.songs.map(song => (
        <div>
          <tr>
            <td>{song.trackName}</td>
            <td>{song.artistName}</td>
            <td>{song.albumName}</td>
            <td>{song.userName}</td>
          </tr>
        </div>
      ))}
    </div>
  );
};

export default Playlist;

//TO DO
// map the songs array and render them
// set if styling statement to change based on if song is played
// render out as a table
