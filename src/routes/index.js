import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Order from '../pages/Order';
import Success from '../pages/Success';
import Error from '../pages/Error';
import NotFound from '../pages/Error/NotFound';

const Routes = () => (
    <Router>
      <Switch>
        <Route exact from='/pay/order/:id' component={Order}/>
        <Route from='/pay/success/:pdt' component={Success}/>
        <Route from='/pay/success' component={Success}/>
        <Route from='/pay/error' component={Error}/>
        <Route from='/' component={NotFound}/>
      </Switch>
    </Router>
);

export default Routes;
