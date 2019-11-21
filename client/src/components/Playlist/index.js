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
      {props.children}
    </div>
  );
};

export default Playlist;

//TO DO
// map the songs array and render them
// set if styling statement to change based on if song is played
// render out as a table
// ^ using a for loop, or make a component for each individual song
//    ^  ie Playlist & PlaylistItem
