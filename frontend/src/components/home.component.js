import React, { Component } from "react";

import ChannelService from "../services/channel.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
    };
  }

  componentDidMount() {
    ChannelService.getChannelList()
      .then((data) => {
        this.setState({ content: data });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ content: null }); // TODO: Better way of error handling
      })
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            {this.state.content ? (
              this.state.content.map((channel) => (
                <div>{channel.channel_name}</div>
              ))
            ) : (
                <p>There was an error</p>
              )}
          </h3>
        </header>
      </div>
    );
  }
}
