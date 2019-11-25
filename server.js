const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const Hashids = require("hashids/cjs");

const routes = require("./routes");

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

//var connection =
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Spotify");

//autoIncrement.initialize(connection);
//spotifySchema.plugin(autoIncrement.plugin, "Spotify");

// Send every request to the React app
// Define any API routes before this runs

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
