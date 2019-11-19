require("dotenv").config();
export const guestEndpoint = "https://accounts.spotify.com/authorize";
// Replace with your app's client ID, redirect URI and desired scopes
export const guestId = "749b6ea423c24fef905f41108b8c3a3f";
export const guestUri = "http://localhost:3000/";
export const guestScopes = [
  "user-top-read",
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-modify-public"
];
