import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "../services/auth.service";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeTsUid = this.onChangeTsUid.bind(this);
    this.onChangeAuthKey = this.onChangeAuthKey.bind(this);
    this.requestAuthKey = this.requestAuthKey.bind(this);

    this.state = {
      tsUid: "",
      authKey: "",
      loading: false,
      message: "",
    };
  }

  onChangeTsUid(e) {
    this.setState({ tsUid: e.target.value });
  }

  onChangeAuthKey(e) {
    this.setState({ authKey: e.target.value });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    AuthService.login(this.state.tsUid, this.state.authKey)
      .then(() => {
        this.props.history.push("/channels");
      })
      .catch((error) => {
        console.log(error)
        this.setState({
          loading: false,
          message: error.message
        })
      })
  }

  requestAuthKey(e) {
    e.preventDefault();

    AuthService.requestAuthKey(this.state.tsUid)
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
        this.setState({
          loading: false,
          message: error.message
        })
      })
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <form onSubmit={this.handleLogin}>
            <div className="form-group">
              <label htmlFor="tsUid">TS UID</label>
              <input
                type="text"
                className="form-control"
                name="tsUid"
                value={this.state.tsUid}
                onChange={this.onChangeTsUid}
              />
            </div>

            <div className="form-group">
              <button
                type="button"
                onClick={this.requestAuthKey}
                className="btn btn-primary btn-block"
              >
                Request Auth Key
              </button>
            </div>

            <div className="form-group">
              <label htmlFor="authKey">Auth Key</label>
              <input
                type="text"
                className="form-control"
                name="authKey"
                autoComplete="off"
                value={this.state.authKey}
                onChange={this.onChangeAuthKey}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                Login
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
      </div>
    );
  }
}
