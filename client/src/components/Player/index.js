import React from "react";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.token,
      deviceId: "",
      error: "",
      loggedIn: false,
      trackName: "Track Name",
      artistName: "Artist Name",
      albumName: "Album Name",
      playing: false,
      position: 0,
      duration: 0
    };
    this.playerCheckInterval = null;
  }

  handleLogin() {
    console.log(this.props);
    this.setState({ token: this.props.token });
    if (this.state.token !== "") {
      this.setState({ loggedIn: true });
    }

    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
  }

  checkForPlayer() {
    const { token } = this.state;

    if (window.Spotify !== null) {
      clearInterval(this.playerCheckInterval);
      this.player = new window.Spotify.Player({
        name: "Spotify Player",
        getOAuthToken: cb => {
          cb(token);
        }
      });
      this.createEventHandlers();

      // finally, connect!
      this.player.connect();
    }
  }

  onStateChanged(state) {
    // if we're no longer listening to music, we'll get a null state.
    if (state !== null) {
      const {
        current_track: currentTrack,
        position,
        duration
      } = state.track_window;
      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(", ");
      const playing = !state.paused;
      this.setState({
        position,
        duration,
        trackName,
        albumName,
        artistName,
        playing
      });
    }
  }

  createEventHandlers() {
    this.player.on("initialization_error", e => {
      console.error(e);
    });
    this.player.on("authentication_error", e => {
      console.error(e);
      this.setState({ loggedIn: false });
    });
    this.player.on("account_error", e => {
      console.error(e);
    });
    this.player.on("playback_error", e => {
      console.error(e);
    });

    // Playback status updates
    this.player.on("player_state_changed", state => this.onStateChanged(state));

    // this.player.getCurrentState().then(state => {
    //   if (!state) {
    //     console.error("User is not playing music through the Web Playback SDK");
    //     return;
    //   }

    //   let {
    //     current_track,
    //     next_tracks: [next_track]
    //   } = state.track_window;

    //   console.log("Currently Playing", current_track);
    //   console.log("Playing Next", next_track);
    // });

    // Ready
    this.player.on("ready", async data => {
      let { device_id } = data;
      console.log("Let the music play on!");
      await this.setState({ deviceId: device_id });
      this.transferPlaybackHere();
    });
  }

  transferPlaybackHere() {
    const { deviceId, token } = this.state;
    fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        device_ids: [deviceId],
        play: true
      })
    });
  }

  onPrevClick() {
    this.player.previousTrack();
  }

  onPlayClick() {
    this.player.togglePlay();
  }

  onNextClick() {
    this.player.nextTrack();
  }

  componentDidMount() {
    // const play = ({
    //   spotify_uri,
    //   playerInstance: {
    //     _options: { getOAuthToken, id }
    //   }
    // }) => {
    //   getOAuthToken(access_token => {
    //     fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
    //       method: "PUT",
    //       body: JSON.stringify({ uris: [spotify_uri] }),
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${access_token}`
    //       }
    //     });
    //   });
    // };
    // play({
    //   playerInstance: new window.Spotify.Player({ name: "Spotify Play" }),
    //   spotify_uri: "spotify:track:7xGfFoTpQ2E7fRF5lN10tr"
    // });
  }

  render() {
    const {
      token,
      loggedIn,
      artistName,
      trackName,
      albumName,
      error,
      position,
      duration,
      playing
    } = this.state;

    return (
      <div className="Player">
        <div className="Player-header">
          <h2>Now Playing</h2>
          <p>A Spotify Web Playback API Demo.</p>
        </div>

        <div>
          <p>Artist: {artistName}</p>
          <p>Track: {trackName}</p>
          <p>Album: {albumName}</p>
          <p>
            <button onClick={() => this.onPrevClick()}> Prev </button>
            <button onClick={() => this.onPlayClick()}>
              {playing ? "Paused" : "Playing"}
            </button>
            <button onClick={() => this.onNextClick()}> Next </button>
          </p>
        </div>
      </div>
    );
  }
}

export default Player;
