import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import LoginPage from './pages/login';

const Auth: React.FC = () => {
  const match = useRouteMatch();

  return (
    <React.Fragment>
      <Switch>
        <Route path={`${match.path}/login`} component={LoginPage} />
      </Switch>
    </React.Fragment>
  );
};

export default Auth;
