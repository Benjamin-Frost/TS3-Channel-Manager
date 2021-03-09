import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import ChannelPage from './pages/channel';

const Channel: React.FC = () => {
  const match = useRouteMatch();

  return (
    <React.Fragment>
      <Switch>
        <Route exact path={`${match.path}`} component={ChannelPage} />
      </Switch>
    </React.Fragment>
  );
};

export default Channel;
