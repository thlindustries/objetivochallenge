import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import Landing from '../pages/Landing';
import Game from '../pages/Game';

const routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/gamestart" exact component={Game} />
    </Switch>
  );
};

export default routes;
