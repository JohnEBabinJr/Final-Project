import React from "react";

const Playlist = props => {
  return (
    <table class="table table-bordered bg-secondary">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  );
};
export default Playlist;

//     <div>
//       <div id="playlistContainer" class="container" />
//       <div class="row mt-3">
//         <div class="col"></div>
//         <div class="col">
//           <th style="border">Track</th>
//         </div>

//         <div class="col"></div>
//         <div class="col">
//           <th>Artist</th>
//         </div>

//         <div class="col"></div>

//         <div class="col">
//           <th>Album</th>
//         </div>
//         <div class="col"></div>
//         <div class="col">
//           <th>User</th>
//         </div>
//         <div class="col"></div>

//         {props.songs.map(song => (
//           <div>
//             <td>{song.trackName}</td>
//             <td>{song.artistName}</td>
//             <td>{song.albumName}</td>
//             <td>{song.userName}</td>
//             <td>
//               <button onClick={props.playButton}></button>
//             </td>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
