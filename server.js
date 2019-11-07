const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const routes = require("./routes");

app.use(routes);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
connection = mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/Spotify"
);

autoIncrement.initialize(connection);

spotifySchema.plugin(autoIncrement.plugin, "Spotify");

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html")); //I think we can get rid of this now that we have routes
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
