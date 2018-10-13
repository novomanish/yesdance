import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Test from './Component/test';
import Register from './Component/register';

export default () => (
  <Switch>
    <Route exact path="/" component={Register} />
    <Route exact path="/test" component={Test} />
  </Switch>
);
