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
      tempTrack: "",
      tempArtist: "",
      tempAlbum: "",
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
    //Set token
    let _token = hash.access_token;
    if (_token) {
      this.setState({
        token: _token
      });
      //this.getCurrentlyPlaying(_token);
    }
  }

  getStuffFromDB = () => {
    //API.getSavedTracks().then(res => console.log(res));
    $.ajax({
      url: "/api/tracks",
      type: "GET",
      contentType: "application/json; charset=utf-8",
      success: data => {
        console.log("data", data);
        // this.setState({
        //   item: data.item,
        //   is_playing: data.is_playing,
        //   progress_ms: data.progress_ms
        //});
      }
    }).then(res => console.log("DB: " + res));
  };

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

  handleTrack(data) {
    console.log("handletrack");
    API.saveTrack({
      roomId: 1,
      trackId: data.tracks.items[0].id,
      trackName: data.tracks.items[0].name,
      artistName: data.tracks.items[0].artists[0].name,
      albumName: data.tracks.items[0].album.name,
      albumCover: data.tracks.items[0].album.images[1].url,
      userName: "Connor"
    }).then(res => console.log("result:" + res));
  }

  getSong(token) {
    var query = "";
    if (this.state.tempTrack && this.state.tempArtist && this.state.tempAlbum) {
      query = `https://api.spotify.com/v1/search?q=${this.state.tempTrack}&type=track&artist=${this.state.tempArtist}&album=${this.state.tempAlbum}&offset=0&limit=1`;
    } else if (
      this.state.tempTrack &&
      this.state.tempArtist &&
      !this.state.tempAlbum
    ) {
      query = `https://api.spotify.com/v1/search?q=${this.state.tempTrack}&type=track&artist=${this.state.tempArtist}&offset=0&limit=1`;
    } else if (
      this.state.tempTrack &&
      !this.state.tempArtist &&
      this.state.tempAlbum
    ) {
      query = `https://api.spotify.com/v1/search?q=${this.state.tempTrack}&type=track&album=${this.state.tempAlbum}&offset=0&limit=1`;
    } else if (
      !this.state.tempTrack &&
      this.state.tempArtist &&
      this.state.tempAlbum
    ) {
      query = `https://api.spotify.com/v1/search?type=track&artist=${this.state.tempArtist}&album=${this.state.tempAlbum}&offset=0&limit=1`;
    } else if (
      this.state.tempTrack &&
      !this.state.tempArtist &&
      !this.state.tempAlbum
    ) {
      query = `https://api.spotify.com/v1/search?q=${this.state.tempTrack}&type=track&offset=0&limit=1`;
    } else if (
      !this.state.tempTrack &&
      this.state.tempArtist &&
      !this.state.tempAlbum
    ) {
      query = `https://api.spotify.com/v1/search?type=track&artist=${this.state.tempArtist}&offset=0&limit=1`;
    } else if (
      !this.state.tempTrack &&
      !this.state.tempArtist &&
      this.state.tempAlbum
    ) {
      query = `https://api.spotify.com/v1/search?type=track&album=${this.state.tempAlbum}&offset=0&limit=1`;
    } else {
      alert("Must enter at least one value!");
    }

    $.ajax({
      url: query,
      //"https://api.spotify.com/v1/search?q=humble&type=track&offset=0&limit=1",
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

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    this.getSong(this.state.token);
    this.getStuffFromDB();
  };

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
          {github} | {aboutUs}
        </div>
        <header className="App-header">
          {this.state.token && (
            <form>
              <input
                type="text"
                placeholder="Track"
                name="tempTrack"
                value={this.state.tempTrack}
                onChange={this.handleInputChange}
              />
              <input
                type="text"
                placeholder="Artist"
                name="tempArtist"
                value={this.state.tempArtist}
                onChange={this.handleInputChange}
              />
              <input
                type="text"
                placeholder="Album"
                name="tempAlbum"
                value={this.state.tempAlbum}
                onChange={this.handleInputChange}
              />
              <button onClick={this.handleFormSubmit}>Submit</button>
            </form>
          )}
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
