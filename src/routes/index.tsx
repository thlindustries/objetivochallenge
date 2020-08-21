import React from 'react';
import { Switch } from 'react-router-dom';

// Components
import Landing from '../pages/Landing';
import Game from '../pages/Game';
import Questionary from '../pages/Questionary';

import Route from './Route';

const routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/gamestart" component={Game} />
      <Route path="/questionary" component={Questionary} isPrivate />
    </Switch>
  );
};

export default routes;
