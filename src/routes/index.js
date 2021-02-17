import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Order from '../pages/Order';

const Routes = () => (
    <Router>
      <Switch>
        <Route exact from='/order/:id' component={Order}/>
      </Switch>
    </Router>
);

export default Routes;
