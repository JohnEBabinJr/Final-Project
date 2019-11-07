import React, { Component } from "react";
import * as $ from "jquery";
import {
  authEndpoint,
  clientId,
  //clientSecret,
  redirectUri,
  scopes
} from "./config_example.js";
import "./App.css";
import hash from "./hash";
import logo from "./spotify-icon.png";
import Player from "./Player";
import API from "./utils/API";

// Identify if host or guest
// Full search
// Playlist
//
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
      //this.getCurrentlyPlaying(_token);
      this.getSong(_token);
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

  handleTrack = data => {
    API.saveTrack({
      roomId: 1,
      trackId: data.tracks.items[0].id,
      trackName: data.tracks.items[0].name,
      artistName: data.tracks.items[0].artists[0].name,
      albumName: data.tracks.items[0].album.name,
      albumCover: data.tracks.items[0].album.images[1],
      userName: "Connor"
    }).then(res => console.log("result:" + res));
  };

  getSong(token) {
    $.ajax({
      url:
        "https://api.spotify.com/v1/search?q=humble&type=track&offset=0&limit=1",
      //"https://api.spotify.com/v1/search?q=humble&type=track&artist=kendrick&offset=0&limit=1",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        console.log("data", data);
        this.setState({
          item: data.tracks.items[0],
          is_playing: data.is_playing,
          progress_ms: data.progress_ms
        });
        this.handleTrack(data);
      }
    });
  }

  render() {
    const github = (
      <a href="https://github.com/JohnEBabinJr/final-project/" class="mr-1">
        <i class="fab fa-github fa-1x"></i>
      </a>
    );

    const aboutUs = (
      <a href="/about" class="ml-2">
        About Us
      </a>
    );

    return (
      // Put things that you want to appear on every page vvv
      <div className="App">
        <div className="links">
          {this.state.token && (
            <input //break out input into seperate component like in 11-stu_reactRouter
              class="form-control frm"
              type="text"
              placeholder="Search"
              aria-label="Search"
            ></input>
          )}
          {github} | {aboutUs}
        </div>
        <header className="App-header">
          {!this.state.token && (
            <div class="container">
              <img src={logo} className="App-logo" alt="logo" />
              <div class="row">
                <div class="col col-5 mx-auto" id="app">
                  <p class="lead mx-3">
                    Collaborate on the ultimate roadtrip playlist with your
                    friends using Spotify. Share the link, queue up songs, and
                    export your playlist to relive the memories.
                  </p>
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
              Login With Spotify
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
