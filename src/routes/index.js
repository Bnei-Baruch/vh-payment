import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Order from '../pages/Order';
import Success from '../pages/Success';
import Error from '../pages/Error';

const Routes = () => (
    <Router>
      <Switch>
        <Route exact from='/payment/order/:id' component={Order}/>
        <Route from='/payment/success' component={Success}/>
        <Route from='/payment/error' component={Error}/>
      </Switch>
    </Router>
);

export default Routes;
