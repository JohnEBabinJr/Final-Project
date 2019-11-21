import React from "react";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ""
    };
  }

  componentDidMount() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token =
        "BQBp6uKyA1MjpUbOQvMrZ1tUJs3R3uu7N1lR8fG7kJbNB8MbT6jSP10v05ywN8xZkl9SijyUKtBCzWii0RzBkjW696Ue8gbuiy-x9ViQenVAnzBa63noKPzrNJvpgCEkyUFQUzSNLG2RbWjwn1iQcH-K0NScpNquiok";
      const player = new Spotify.Player({
        name: "Web Playback SDK Quick Start Player",
        getOAuthToken: cb => {
          cb(token);
        }
      });

      // Error handling
      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("account_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("playback_error", ({ message }) => {
        console.error(message);
      });

      // Playback status updates
      player.addListener("player_state_changed", state => {
        console.log(state);
      });

      // Ready
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      // Not Ready
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      // Connect to the player!
      player.connect();
    };
  }

  render() {
    return (
      <iframe
        title="Spotify"
        className="SpotifyPlayer"
        src="https://sdk.scdn.co/spotify-player.js"
        //src={`https://embed.spotify.com/?uri=${uri}&view=${view}&theme=${theme}`}
      />
    );
  }
}

export default Player;
