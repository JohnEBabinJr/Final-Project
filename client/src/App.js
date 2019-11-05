import React, { Component } from "react";
import * as $ from "jquery";
import {
  authEndpoint,
  clientId,
  clientSecret,
  redirectUri,
  scopes
} from "./config_example.js";
// Important
import "./App.css";
import hash from "./hash";
import Player from "./Player";
import logo from "./spotify-icon.png";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0
      },
      is_playing: "Paused",
      progress_ms: 0
    };
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }

  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      this.getCurrentlyPlaying(_token);
    }
  }

  getCurrentlyPlaying(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        console.log("data", data);
        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {!this.state.token && (
            <div class="container text-center bg-dark">
              <div class="row">
                <div class="col col-5 mx-auto" id="app">
                  <p class="lead text-center mx-3">
                    Collaborate on the ultimate roadtrip playlist with your
                    friends using Spotify. Share the link, queue up songs, and
                    export your unforgettable playlist.
                  </p>
                </div>
              </div>

              <div class="row text-center">
                <div class="col">
                  <a href="https://github.com/JohnEBabinJr/final-project/">
                    <i class="fab fa-github fa-1x"></i>
                  </a>{" "}
                  |
                  <a href="/about" class="ml-2">
                    About Us
                  </a>
                </div>
              </div>
            </div>
          )}
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
          {this.state.token && (
            <Player
              item={this.state.item}
              is_playing={this.state.is_playing}
              progress_ms={this.progress_ms}
            />
          )}
        </header>
      </div>
    );
  }
}

export default App;
