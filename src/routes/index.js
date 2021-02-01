import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Payment from '../pages/Payment';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact from='/payment' component={Payment}/>
      <Redirect exact from='/' to='/component'/>
      <Route path="*" component={Payment}/>
    </Switch>
  </Router>
);

export default Routes;
