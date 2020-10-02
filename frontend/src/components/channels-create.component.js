import React, { Component } from "react";

import ChannelService from "../services/channel.service";

export default class ChannelCreate extends Component {
    constructor(props) {
        super(props);

        this.onChangeChannelName = this.onChangeChannelName.bind(this);
        this.onChangeChannelPassword = this.onChangeChannelPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            channelName: "",
            channelPassword: "",
            message: ""
        }
    }

    onChangeChannelName(e) {
        this.setState({ channelName: e.target.value })
    }

    onChangeChannelPassword(e) {
        this.setState({ channelPassword: e.target.value })
    }

    async handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await ChannelService.createChannel(this.state.channelName.trim(), this.state.channelPassword);
            if (res.status === 200)
                this.props.history.push('/channels');
        }
        catch (error) {
            this.setState({ message: error.message });
        }
    }

    render() {
        return (
            <div className="container">
                <h3 className="my-4">Create new Channel</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="channelName">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="channelName"
                            value={this.state.channelName}
                            onChange={this.onChangeChannelName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="channelPassword">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="channelPassword"
                            value={this.state.channelPassword}
                            onChange={this.onChangeChannelPassword}
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">
                            Create Channel
                        </button>
                    </div>

                    {this.state.message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {this.state.message}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        );
    }
}