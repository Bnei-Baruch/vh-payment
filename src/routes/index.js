import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Auth from '../components/Auth';
import Order from '../pages/Order';

const Routes = () => (
  <Auth>
    <Router>
      <Switch>
        <Route exact from='/order/:id' component={Order}/>
        {/*<Redirect to='/payment'/>*/}
      </Switch>
    </Router>
  </Auth>
);

export default Routes;
