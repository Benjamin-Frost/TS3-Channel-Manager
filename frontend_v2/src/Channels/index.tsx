import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import ChannelsPage from './pages/channels';

const Channels: React.FC = () => {
  const match = useRouteMatch();

  return (
    <React.Fragment>
      <Switch>
        <Route exact path={`${match.path}`} component={ChannelsPage} />
      </Switch>
    </React.Fragment>
  );
};

export default Channels;
