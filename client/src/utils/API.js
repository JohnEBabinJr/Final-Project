import axios from "axios";

export default {
  // Gets books from the Google API
  getTracks: function(q) {
    return axios.get("/api/google", { params: { q: "title:" + q } });
  },
  // Gets all saved books
  getSavedBooks: function() {
    return axios.get("/api/books");
  },
  // Deletes the saved book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves an book to the database
  saveTrack: function(trackData) {
    return axios.post("/api/tracks", trackData);
  }
};