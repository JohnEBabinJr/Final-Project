import React, { Component } from "react";
import * as $ from "jquery";
import "./App.css";
import hash from "./hash";
import logo from "./spotify-icon.png";
//import AltPlayer from "./components/Player/index";
import Playlist from "./components/Playlist/index";
import Host from "./Host";
import Guest from "./Guest";
import API from "./utils/API";
import SpotifyPlayer from "react-spotify-player";
import ChangeColorFunction from "./components/Colorchange";
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
import { ENETUNREACH } from "constants";
import Hashids from "hashids/cjs";

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
      nextToPlay: [],
      currentlyPlaying: "",
      room: "",
      username: "",
      tempTrack: "",
      tempArtist: "",
      tempAlbum: "",
      token: "",
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
      this.makeRoom();

      setTimeout(this.getStuffFromDB, 500);
    }
  }

  hashId = () => {
    var hashids = new Hashids(
        Math.floor(Math.random() * Math.floor(1000)).toString()
      ),
      id = hashids.encode(3, 2),
      numbers = hashids.decode(id);

    console.log(id);

    return id;
  };

  makeRoom = () => {
    var roomId;
    var nick = sessionStorage.getItem("nickname");

    if (sessionStorage.getItem("room")) {
      roomId = sessionStorage.getItem("room");

      this.setState({
        room: roomId,
        nickname: nick
      });
      sessionStorage.removeItem("room");
      return this.state.room;
    } else {
      roomId = this.hashId();
      // var Arr = [];
      // function getRandomInt() {
      //   return Math.floor(Math.random() * Math.floor(10));
      // }
      // for (var i = 0; i < 4; i++) {
      //   Arr.push(getRandomInt());
      // }

      // roomId = Arr.join("");

      console.log(roomId);
      this.setState({
        room: roomId,
        nickname: nick
      });

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

  //unused function
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

  //uses user input to query spotify api, posts song info to db, calls it back from db to display
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
    var tempId = "";
    $.ajax({
      url: query,

      //"https://api.spotify.com/v1/search?q=humble&type=track&artist=kendrick&offset=0&limit=1",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        console.log("data", data);
        tempId = data.tracks.items[0].id;
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
      }
    })
      .then(setTimeout(this.getStuffFromDB, 1000))
      .then(() => {
        this.setCurrentPlayingSong(tempId); //temporary fix to present, since player isnt working
      });
  }

  setCurrentPlayingSong(trackId) {
    this.setState({ currentlyPlaying: trackId });
    var j;
    var tempArray = [];
    this.setState({ nextToPlay: [] });
    this.state.songArray.map(song => {
      tempArray.push(song.trackId);
    });

    tempArray.forEach((item, index) => {
      if (trackId === item) {
        j = index;
      }
    });

    var secondTemp = [];
    for (var i = j + 1; i < tempArray.length; i++) {
      secondTemp.push(tempArray[i]);
    }
    this.setState({ nextToPlay: secondTemp });
  }

  //currently unused funct
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

    this.ChangeColorFunction();
  };

  render() {
    const size = {
      justifyContent: "center",
      border: "10%",
      width: "90%",
      marginBottom: "10px"
    };

    const github = (
      <a href="https://github.com/JohnEBabinJr/final-project/" className="mr-1">
        <i className="fab fa-github fa-1x"></i>
      </a>
    );

    const aboutUs = (
      <a href="/about" className="ml-2">
        About Us
      </a>
    );

    const homebutton = {
      float: "left",
      marginLeft: "10px"
    };

    const home = (
      <a href="/">
        <i className="fas fa-home"></i>
      </a>
    );

    const pee = (
      <a href="https://jon-finder.herokuapp.com/" target="_blank">
        <i class="fas fa-toilet"></i>
      </a>
    );

    return (
      // Put things that you want to appear on every page vvv
      <div className="App">
        <div className="home">
          <a style={homebutton}>{home}</a>
        </div>
        <div className="links">
          {github} | {pee} | {aboutUs} |
        </div>
        <header className="App-header">
          {this.state.token && (
            <div>
              <div class="container">
                <div class="row">
                  <div class="col">
                    <div className="Player-header">
                      <h2>Now Playing</h2>
                      <p>
                        Let's get this party started,{" "}
                        <span className="nickname">{this.state.nickname}</span>!
                        Your room number is:
                        <br></br>
                        <span className="roomID">{this.state.room}</span>
                      </p>
                      <hr class="my-4" id="spacer"></hr>
                    </div>
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
                  </div>
                </div>
              </div>
            </div>
          )}
          {!this.state.token && (
            <div className="container">
              <img src={logo} className="App-logo" alt="logo" />
              <div className="row">
                <div className="col col-5 mx-auto" id="app">
                  <h1>
                    Car - <i class="fas fa-road"></i> - OK
                  </h1>
                  <p className="lead mx-3">
                    Collaborate on the ultimate roadtrip playlist with your
                    friends using Spotify. Share the link, queue up songs, and
                    export your playlist to relive the memories.
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="container" id="buttonContainer">
            <div className="row">
              <div className="col">
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
                        id="validationCustomUsername"
                      />
                      <div class="invalid-feedback">
                        Please enter a nickname.
                      </div>
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

              <div className="col">
                {" "}
                {/* Guest Login */}
                {!this.state.token && (
                  <Guest>
                    {" "}
                    <form className="form">
                      <div className="form-group mb-2">
                        <label for="nickname" className="sr-only">
                          nickname
                        </label>
                        <input
                          type="text"
                          className="form-control-plaintext"
                          name="nickname"
                          placeholder="Nickname"
                          value={this.state.nickname}
                          onChange={this.handleInputChange}
                          id="validationCustomUsername"
                        />
                        <div class="invalid-feedback">
                          Please enter a nickname.
                        </div>
                        <input
                          type="text"
                          className="form-control-plaintext"
                          placeholder="Room ID"
                          name="room"
                          value={this.state.room}
                          onChange={this.handleInputChange}
                          id="validationCustomUsername"
                        />
                        <div class="invalid-feedback">
                          Please enter a Room ID.
                        </div>
                        <div class="container">
                          <div class="row">
                            <div class="col">
                              <a
                                id="goButton"
                                className="btn btn--loginApp-link"
                                href={`${guestEndpoint}?client_id=${guestId}&redirect_uri=${guestUri}&scope=${guestScopes.join(
                                  "%20"
                                )}&response_type=token&show_dialog=true`}
                                onClick={this.handleModalSubmit}
                              >
                                Go
                              </a>
                            </div>
                          </div>
                        </div>
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

          {this.state.token && this.state.currentlyPlaying && (
            <SpotifyPlayer
              uri={"spotify:track:" + this.state.currentlyPlaying}
              // size={size}
              view="list"
              theme="black"
            />
          )}

          {this.state.token && (
            <Playlist>
              {this.state.songArray.map(song => (
                <tbody>
                  <tr>
                    <th scope="row">{song.id}</th>
                    <td>{song.trackName}</td>
                    <td>{song.artistName}</td>
                    <td>{song.albumName}</td>
                    <td>{song.userName}</td>
                    <td>
                      {" "}
                      <button
                        id="currentSong"
                        onClick={() => this.setCurrentPlayingSong(song.trackId)}
                      >
                        <i class="fas fa-play"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </Playlist>
          )}
          {/* <AltPlayer token={this.state.token} nickname={this.state.nickname} /> */}
        </header>
      </div>
    );
  }
}

export default App;
