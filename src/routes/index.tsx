import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import Landing from '../pages/Landing';
import Testin from '../pages/Testin';

const routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/test" exact component={Testin} />
    </Switch>
  );
};

export default routes;
