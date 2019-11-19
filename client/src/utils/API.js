import axios from "axios";
export default {
  // Gets books from the Google API
  // getTracks: function(q) {
  //   return axios.get("/api/google", { params: { q: "title:" + q } });
  // },
  // Gets all saved books
  getTracks: function() {
    return axios.get("/api/tracks");
  },
  getTracksById: function(id) {
    return axios.get("/api/tracks/" + id);
  },
  getTracksByRoomId: function(id) {
    return axios.get("/api/tracks/" + id);
  },
  // Deletes the saved book with the given id
  deleteTracks: function(id) {
    return axios.delete("/api/tracks/" + id);
  },
  // Saves an book to the database
  saveTrack: function(trackData) {
    return axios.post("/api/tracks", trackData); //change /api/tracks to /3001 to bypass proxy
  }
};
//instead of api/tracks, use /room/:roomId and then /room/:roomId/api/:trackId
