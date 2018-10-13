import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Test from './component/test';
import Register from './component/register';
import store from './redux/store';


export default () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Register} />
        <Route exact path="/test" component={Test} />
      </Switch>
    </BrowserRouter>
  </Provider>
);
