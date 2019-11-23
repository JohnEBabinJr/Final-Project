import React, { Component } from "react";

export default class App extends Component {
  constructor() {
    super();
    this.state = { ColorHolder: "#00BCD4" };
  }

  ChangeColorFunction = () => {
    var ColorCode =
      "rgb(" +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      ")";
    this.setState({
      ColorHolder: ColorCode
    });
  };
}
