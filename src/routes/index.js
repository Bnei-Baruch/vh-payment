import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Order from '../pages/Order';
import Success from '../pages/Success';
import Error from '../pages/Error';

const Routes = () => (
    <Router>
      <Switch>
        <Route exact from='/pay/order/:id' component={Order}/>
        <Route from='/pay/success' component={Success}/>
        <Route from='/pay/error' component={Error}/>
      </Switch>
    </Router>
);

export default Routes;
