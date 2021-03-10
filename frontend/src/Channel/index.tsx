import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import ChannelPage from './pages/channel';
import CreateChannelPage from './pages/create';
import ChannelEditPage from './pages/edit';

const Channel: React.FC = () => {
  const match = useRouteMatch();

  return (
    <React.Fragment>
      <Switch>
        <Route exact path={`${match.path}`} component={ChannelPage} />
        <Route path={`${match.path}/create`} component={CreateChannelPage} />
        <Route path={`${match.path}/:id`} component={ChannelEditPage} />
      </Switch>
    </React.Fragment>
  );
};

export default Channel;
