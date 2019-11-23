import React from "react";
import "../../App.css";

const Playlist = props => {
  return (
    <div>
      <div class="container">
        <div class="row">
          <table class="table table-bordered bg-white" id="playlistTable">
            {/* <div class="col">#</div>
            <div class="col">Song</div>
            <div class="col">Artist</div>
            <div class="col">Album</div>
            <div class="col">Added</div> */}

            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Song</th>
                <th scope="col">Artist</th>
                <th scope="col">Album</th>
                <th scope="col">Added</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      <div>{props.children}</div>
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
