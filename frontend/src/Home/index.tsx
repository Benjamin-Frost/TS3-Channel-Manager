import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import HomePage from './pages/home';

const Home: React.FC = () => {
  const match = useRouteMatch();

  return (
    <React.Fragment>
      <Switch>
        <Route exact path={`${match.path}`} component={HomePage} />
      </Switch>
    </React.Fragment>
  );
};

export default Home;
