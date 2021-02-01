import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

const Payment = lazy(() => import('../pages/Payment'));

const Routes = () => (
  <Router>
    <Switch>
      <Suspense fallback={<div>Loading...</div>}>
        <Route exact from='/payment' component={Payment}/>
        <Redirect exact from='/' to='/component'/>
        <Route path="*" component={Payment}/>
      </Suspense>
    </Switch>
  </Router>
);

export default Routes;
