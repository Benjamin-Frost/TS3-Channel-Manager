import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../Auth/services/auth';

interface Props {
  component: React.FC;
  path: string;
  exact?: boolean;
}

const PrivateRoute: React.FC<Props> = (props: Props) => {
  return AuthService.isAuthenticated() ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/auth/login" />
  );
};

export default PrivateRoute;
