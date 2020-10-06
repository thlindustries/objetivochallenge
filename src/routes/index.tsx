import React from 'react';
import { Switch } from 'react-router-dom';

// Components
import Landing from '../pages/Landing';
import Game from '../pages/Game';
import Regulamento from '../pages/Regulamento';
import Questionary from '../pages/Questionary';
import Fake from '../pages/Fake';
import EndGame from '../pages/EndGame';

import Route from './Route';

const routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/gamestart" component={Game} />
      <Route path="/regulamento" component={Regulamento} />
      <Route path="/questionary" component={Questionary} isPrivate />
      <Route path="/fake/:user/:pass" component={Fake} />
      <Route path="/endgame" component={EndGame} isPrivate />
    </Switch>
  );
};

export default routes;
