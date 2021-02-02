import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Auth from '../Auth';
import Payment from '../pages/Payment';

const Routes = () => (
  <Auth>
    <Router>
      <Switch>
        <Route exact from='/payment' component={Payment}/>
        <Redirect to='/payment'/>
      </Switch>
    </Router>
  </Auth>
);

export default Routes;
