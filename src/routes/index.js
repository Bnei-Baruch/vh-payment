import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Order from '../pages/Order';
import Ticket from '../pages/Order/tickets';
import UserDetail from '../pages/registration';
import Success from '../pages/Success';
import Error from '../pages/Error';
import NotFound from '../pages/Error/NotFound';
import Payment from '../pages/Order/payment';
import OtherPayment from '../pages/Order/otherpayment';
import Needhelp from '../pages/Order/Needhelp';

const Routes = () => (
    <Router>
      <Switch>
        <Route exact from='/pay/order/:id' component={Order}/>
        <Route exact from='/pay/order/ticket/:event_slug' component={Ticket}/>
        <Route exact from='/pay/order/ticket/payment/:event_slug' component={Payment}/>
        <Route exact from='/pay/order/ticket/payment/help/:event_slug' component={Needhelp}/>
        <Route exact from='/pay/order/ticket/payment/others/:event_slug' component={OtherPayment}/>
        <Route from='/pay/order/register/userdetail' component={UserDetail}/>
        <Route from='/pay/success/:pdt' component={Success}/>
        <Route from='/pay/success' component={Success}/>
        <Route from='/pay/error' component={Error}/>
        <Route from='/' component={NotFound}/>
      </Switch>
    </Router>
);

export default Routes;
