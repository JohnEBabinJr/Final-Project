const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const Schema = mongoose.Schema;

const spotifySchema = new Schema({
  roomId: { type: String, required: true },
  trackId: { type: Number, required: true },
  trackName: { type: String, required: true },
  artistName: { type: String, required: true },
  albumName: { type: String, required: true },
  albumCover: { type: String, required: true },
  userName: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Track = mongoose.model("Spotify", spotifySchema);

module.exports = Track;
