import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Test from "./Component/test";
import Register from "./Component/register";

// The Roster component matches one of two different routes
// depending on the full pathname
const Routes = () => (
  <Switch>
    <Route exact path='/' component={Register}/>
    <Route exact path='/test' component={Test}/>
  </Switch>
)


export default Routes
