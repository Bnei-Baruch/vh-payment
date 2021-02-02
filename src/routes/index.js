import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Auth from '../Auth';

const Payment = lazy(() => import('../pages/Payment'));

const Routes = () => (
  <Router>
    <Switch>
      <Suspense fallback={<div>Loading...</div>}>
        <Route exact from='/payment' component={Payment} onEnter={Auth}/>
        <Redirect exact from='/' to='/payment'/>
        {/*<Route path="*" component={Payment}/>*/}
      </Suspense>
    </Switch>
  </Router>
);

export default Routes;
