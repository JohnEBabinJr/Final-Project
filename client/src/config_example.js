require("dotenv").config();
export const authEndpoint = "https://accounts.spotify.com/authorize";

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = "749b6ea423c24fef905f41108b8c3a3f";
export const clientSecret = "e42d147ddad74c2ab3cee9af552aac39";
export const redirectUri = "http://car-a-ok.herokuapp.com";

export const scopes = [
  "user-top-read",
  "user-read-email",
  "user-read-private",
  "user-read-currently-playing",
  "user-read-playback-state",
  "streaming",
  "user-modify-playback-state",
  "app-remote-control",
  "playlist-modify-public"
];

//id("749b6ea423c24fef905f41108b8c3a3f");
//e42d147ddad74c2ab3cee9af552aac39

//process.env.SPOTIFY_SECRET
