import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './utils/private-route';
import AuthService from './Auth/services/auth';

// Bootstrap Imports
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Module Imports
import Home from './Home';
import Auth from './Auth';
import Channel from './Channel';

// Helper Function
const logout = () => {
  AuthService.logout();
  window.location.reload();
};

ReactDOM.render(
  <React.StrictMode>
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">TS3 Channel Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {AuthService.isAuthenticated() && (
              <Nav.Link href="/channels">Channels</Nav.Link>
            )}
          </Nav>
          {AuthService.isAuthenticated() ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            <Button href="/auth/login">Login</Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="my-5" />
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={Auth} />
        <PrivateRoute path="/channels" component={Channel} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
