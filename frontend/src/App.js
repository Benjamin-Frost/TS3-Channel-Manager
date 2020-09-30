import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.slim.js";
import "bootstrap/js/dist/collapse.js";

import AuthService from "./services/auth.service";
import { PrivateRoute } from "./helpers/PrivateRoute";

import Login from "./components/login.component";
import ChannelsList from "./components/channels-list.component";
import ChannelsCreate from "./components/channels-create.component";
import ChannelsEdit from "./components/channels-edit.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: null,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    AuthService.logout();
    window.location.reload();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
              <Link to={"/"} className="navbar-brand">TS3 Channel Manager</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  {currentUser && (
                    <li className="nav-item">
                      <Link to={"/channels"} className="nav-link">Channels</Link>
                    </li>
                  )}
                </ul>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    {currentUser ? (
                      <button className="btn btn-primary" onClick={this.logOut}>Logout</button>
                    ) : (
                      <Link to={"/login"} className="btn btn-primary">Login</Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route path="/login" component={Login} />
              <PrivateRoute exact path="/channels" component={ChannelsList} />
              <PrivateRoute path="/channels/create" component={ChannelsCreate} />
              <PrivateRoute path="/channels/edit/:id" component={ChannelsEdit} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
