import React, { Component } from "react";

import ChannelService from "../services/channel.service";

export default class ChannelsEdit extends Component {
    constructor(props) {
        super(props);

        this.onChangeChannelName = this.onChangeChannelName.bind(this);
        this.onChangeChannelPassword = this.onChangeChannelPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            oldChannelName: "",
            channelName: "",
            channelPassword: "",
            message: ""
        }
    }

    componentDidMount() {
        ChannelService.getChannelById(this.props.match.params.id)
            .then((data) => {
                this.setState({
                    channelName: data[0].channel_name,
                    oldChannelName: data[0].channel_name
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({ content: [] });
            })
    }

    onChangeChannelName(e) {
        this.setState({ channelName: e.target.value })
    }

    onChangeChannelPassword(e) {
        this.setState({ channelPassword: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();

        const cName = this.state.channelName.trim()
        const cPass = this.state.channelPassword.trim()

        let newChannelProps = {}

        if (cName && cName !== this.state.oldChannelName.trim()) {
            newChannelProps["channelName"] = cName;
        }

        if (cPass) {
            newChannelProps["channelPassword"] = cPass;
        }

        ChannelService.editChannel(this.props.match.params.id, newChannelProps)
            .then((data) => {
                if (data.status === 200) {
                    this.props.history.push('/channels')
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({ message: error.message });
            })
    }

    render() {
        return (
            <div className="container">
                <h3 className="my-4">Edit Channel</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="channelName">New Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="channelName"
                            value={this.state.channelName}
                            onChange={this.onChangeChannelName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="channelPassword">New Password</label>
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
                            Edit Channel
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