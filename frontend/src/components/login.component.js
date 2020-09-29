import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import StepWizard from 'react-step-wizard';

import AuthService from "../services/auth.service";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeTsUid = this.onChangeTsUid.bind(this);
    this.onChangeAuthKey = this.onChangeAuthKey.bind(this);

    this.state = {
      tsUid: "",
      authKey: "",
    };
  }

  onChangeTsUid(e) {
    this.setState({ tsUid: e.target.value });
  }

  onChangeAuthKey(e) {
    this.setState({ authKey: e.target.value });
  }

  render() {
    if (AuthService.isAuthenticated()) {
      return (
        <Redirect to="/channels" />
      )
    }

    return (
      <div className="jumbotron">
        <div className="row">
          <div className="col-12">
            <StepWizard>
              <First state={this.state} onChange={this.onChangeTsUid} />
              <Second state={this.state} onChange={this.onChangeAuthKey} history={this.props.history} />
            </StepWizard>
            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const Stats = ({
  nextStep,
  totalSteps,
  step,
}) => (
    <div>
      <hr />
      { step < totalSteps ?
        <button className="btn btn-primary btn-block" onClick={nextStep}>Continue</button>
        :
        <button className="btn btn-success btn-block" onClick={nextStep}>Finish</button>
      }
    </div>
  );

const First = props => {
  const requestAuthKey = async () => {
    try {
      await AuthService.requestAuthKey(props.state.tsUid);
      props.nextStep();
    }
    catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <h2 className="text-center mb-3">Welcome!</h2>

      <label>TS UID</label>
      <input type="text" className="form-control" name="tsUid" onChange={props.onChange} />

      <Stats step={1} {...props} nextStep={requestAuthKey} />
    </div>
  );
};

const Second = props => {
  const handleLogin = async () => {
    try {
      await AuthService.login(props.state.tsUid, props.state.authKey);
      props.history.push("/channels");
      window.location.reload();
    }
    catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <h2 className="text-center">Almost there!</h2>

      <label>Auth Key</label>
      <input type="text" className="form-control" name="authKey" autoComplete="off" onChange={props.onChange} />

      <Stats step={2} {...props} nextStep={handleLogin} />
    </div>
  );
};
