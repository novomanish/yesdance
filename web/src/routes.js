import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Test from "./Component/test";
import App from "./Component/app";

// The Roster component matches one of two different routes
// depending on the full pathname
const Routes = () => (
  <Switch>
    <Route exact path='/' component={App}/>
    <Route exact path='/test' component={Test}/>
  </Switch>
)


export default Routes
