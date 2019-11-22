import React, { Component } from "react";
import * as $ from "jquery";
import "./App.css";
import hash from "./hash";
import logo from "./spotify-icon.png";
import Player from "./Player";
//import altPlayer from "./components/Player/index";
import Playlist from "./components/Playlist/index";
import Host from "./Host";
import Guest from "./Guest";
import API from "./utils/API";
import ReactDOM from "react-dom";
import SpotifyPlayer from "react-spotify-player";
import {
  authEndpoint,
  clientId,
  redirectUri,
  scopes
} from "./config_example.js";
import {
  guestEndpoint,
  guestId,
  guestUri,
  guestScopes
} from "./guest_config.js";
// Identify if host or guest
// Full search
// Playlist
//
class App extends Component {
  constructor() {
    super();
    this.state = {
      nickname: "",
      songArray: [],
      room: "",
      username: "",
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
      nextToPlay: "",
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
      this.makeRoom();
      setTimeout(this.getStuffFromDB, 500);
    }
  }
  makeRoom = () => {
    // var hashids = new Hashids("this is my salt"),
    //   id = hashids.encode(1, 2, 3),
    //   numbers = hashids.decode(id);

    var roomId;
    if (sessionStorage.getItem("room")) {
      roomId = sessionStorage.getItem("room");
      this.setState({
        room: roomId
      });
      sessionStorage.removeItem("room");
      return this.state.room;
    } else {
      roomId = "";
      var Arr = [];
      function getRandomInt() {
        return Math.floor(Math.random() * Math.floor(10));
      }
      for (var i = 0; i < 4; i++) {
        Arr.push(getRandomInt());
      }

      roomId = Arr.join("");
      console.log(roomId);
      this.setState({ room: roomId });
      sessionStorage.removeItem("room");
      return this.state.room;
    }
  };

  getStuffFromDB = () => {
    API.getTracksByRoomId(this.state.room).then(res => {
      this.setState({
        songArray: res.data
      });
      console.log(this.state.songArray);
    });
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

      //"https://api.spotify.com/v1/search?q=humble&type=track&artist=kendrick&offset=0&limit=1",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        console.log("data", data);
        var nickName = sessionStorage.getItem("nickname");
        API.saveTrack({
          roomId: this.state.room,
          trackId: data.tracks.items[0].id,
          trackName: data.tracks.items[0].name,
          artistName: data.tracks.items[0].artists[0].name,
          albumName: data.tracks.items[0].album.name,
          albumCover: data.tracks.items[0].album.images[1].url,
          userName: nickName
        });
        console.log(this.state.nickname);
      }
    }).then(setTimeout(this.getStuffFromDB, 1000));
  }

  setSong() {
    alert("Hello!");
  }

  // setPlaylist() {
  //   //map songs up until current playing, then set all next song to be played to state
  //   this.songArray.map(song => {
  //     song.played = false;
  //   });
  //   this.songArray.trackId = this.state.is_playing;
  // }

  setCurrentPlayingSong(trackId) {
    alert(trackId);
  }
  handleTrack(data) {
    console.log("handletrack");
    API.saveTrack({
      roomId: this.makeRoom(),
      trackId: data.tracks.items[0].id,
      trackName: data.tracks.items[0].name,
      artistName: data.tracks.items[0].artists[0].name,
      albumName: data.tracks.items[0].album.name,
      albumCover: data.tracks.items[0].album.images[1].url,
      userName: this.state.nickname
    }).then(res => console.log("result:" + res));
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
  };

  handleModalSubmit = () => {
    sessionStorage.setItem("nickname", this.state.nickname);
    if (this.state.room) {
      sessionStorage.setItem("room", this.state.room);
    }
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

    const homebutton = {
      float: "left",
      marginLeft: "10px"
    };

    const home = (
      <a href="/">
        <i class="fas fa-home"></i>
      </a>
    );

    const props = {};

    return (
      // Put things that you want to appear on every page vvv
      <div className="App">
        <div className="home">
          <a style={homebutton}>{home}</a>
        </div>
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
                  <h1>Car-OK</h1>
                  <p class="lead mx-3">
                    Collaborate on the ultimate roadtrip playlist with your
                    friends using Spotify. Share the link, queue up songs, and
                    export your playlist to relive the memories.
                  </p>
                </div>
              </div>
            </div>
          )}
          <div class="container" id="buttonContainer">
            <div class="row">
              <div class="col">
                {" "}
                {/* Host Login */}
                {!this.state.token && (
                  <Host>
                    {" "}
                    <form>
                      <input
                        type="text"
                        placeholder="Nickname"
                        name="nickname"
                        value={this.state.nickname}
                        onChange={this.handleInputChange}
                      />

                      <a
                        id="goButton"
                        className="btn btn--loginApp-link"
                        href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                          "%20"
                        )}&response_type=token&show_dialog=true`}
                        onClick={this.handleModalSubmit}
                      >
                        Go
                      </a>
                    </form>
                  </Host>
                )}
              </div>

              <div class="col">
                {" "}
                {/* Guest Login */}
                {!this.state.token && (
                  <Guest>
                    {" "}
                    <form class="form-inline">
                      <div class="form-group mb-2">
                        <label for="nickname" class="sr-only">
                          nickname
                        </label>
                        <input
                          type="text"
                          class="form-control-plaintext"
                          name="nickname"
                          placeholder="Nickname"
                          value={this.state.nickname}
                          onChange={this.handleInputChange}
                        />
                        <input
                          type="text"
                          class="form-control-plaintext"
                          placeholder="Room ID"
                          name="room"
                          value={this.state.room}
                          onChange={this.handleInputChange}
                        />
                        <a
                          className="btn btn--loginApp-link"
                          href={`${guestEndpoint}?client_id=${guestId}&redirect_uri=${guestUri}&scope=${guestScopes.join(
                            "%20"
                          )}&response_type=token&show_dialog=true`}
                          onClick={this.handleModalSubmit}
                        >
                          Guest
                        </a>
                      </div>
                    </form>
                  </Guest>
                )}
              </div>
            </div>
          </div>

          {/* Player */}
          {/* {this.state.token && (
            <Player
              token={this.state.token}
              item={this.state.item}
              is_playing={this.state.is_playing}
              progress_ms={this.progress_ms}
            />
          )} */}
          {this.state.token && (
            <Playlist>
              {this.state.songArray.map(song => (
                <div>
                  <tr>
                    <td>{song.trackName}</td>
                    <td>{song.artistName}</td>
                    <td>{song.albumName}</td>
                    <td>{song.userName}</td>
                    <td>
                      <button
                        onClick={() => this.setCurrentPlayingSong(song.trackId)}
                      ></button>
                    </td>
                  </tr>
                </div>
              ))}
            </Playlist>
          )}
          {/* <altPlayer></altPlayer> */}

          {/* <SpotifyPlayer
            uri="spotify:album:1TIUsv8qmYLpBEhvmBmyBk"
           
          /> */}
        </header>
      </div>
    );
  }
}

export default App;
