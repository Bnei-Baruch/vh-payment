import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Order from "../pages/Order";
import Ticket from "../pages/Order/EventTicket/tickets";
import UserDetail from "../pages/registration";
import Success from "../pages/Success";
import Error from "../pages/Error";
import NotFound from "../pages/Error/NotFound";
import Payment from "../pages/Order/EventTicket/payment";
import OtherPayment from "../pages/Order/otherpayment";
import Needhelp from "../pages/Order/Needhelp";
import Membership from "../pages/Order/Membership/Membership";
import MembershipPayment from "../pages/Order/Membership/MembershipPayment";
import SuccessMembership from "../pages/Order/Membership/SuccessMembership";
import HelpHaverSuccess from "../pages/Success/helphaversuccess";
import MembershipIntersticial from "../pages/Order/Interesticial/membershipIntersticial";
import HelpHaver from "../pages/Order/Interesticial/helphaver";
import SpecialOption from "../pages/Order/SpecialOption/SpecialOption";
import SpecialOptionInterestical from "../pages/Order/Interesticial/specialoption";
import SpecialOptionSuccess from "../pages/Success/specialoptionsuccess";
import MembershipHelphaver from "../pages/Order/Interesticial/membershipHelpHaver";

const Routes = () => (
  <Router>
    <Switch>
      <Route exact from="/pay/order/:id" component={Order} />
      <Route exact from="/pay/membership" component={Membership} />
      <Route
        exact
        from="/pay/membership/payment/:plan"
        component={MembershipPayment}
      />
      <Route
        exact
        from="/pay/membership/payment/:plan/success"
        component={SuccessMembership}
      />
      <Route exact from="/pay/order/ticket/:event_slug" component={Ticket} />
      <Route
        exact
        from="/pay/order/ticket/payment/:event_slug"
        component={Payment}
      />
      <Route
        exact
        from="/pay/order/ticket/payment/intersticial/:event_slug"
        component={MembershipHelphaver}
      />
      <Route
        exact
        from="/pay/order/ticket/payment/membership/:event_slug"
        component={MembershipIntersticial}
      />
      <Route
        exact
        from="/pay/order/ticket/payment/help/:event_slug"
        component={HelpHaver}
      />
      <Route
        exact
        from="/pay/order/ticket/payment/special/:event_slug"
        component={SpecialOption}
      />
      <Route
        exact
        from="/pay/order/ticket/payment/special/:event_slug/:option"
        component={SpecialOptionInterestical}
      />
      <Route
        exact
        from="/pay/order/ticket/payment/special/:event_slug/:option/success"
        component={SpecialOptionSuccess}
      />
      <Route
        exact
        from="/pay/order/ticket/payment/help/:event_slug/success"
        component={HelpHaverSuccess}
      />
      <Route
        exact
        from="/pay/order/ticket/payment/help/:event_slug"
        component={Needhelp}
      />
      <Route
        exact
        from="/pay/order/ticket/payment/others/:event_slug"
        component={OtherPayment}
      />
      <Route
        from="/pay/order/register/:participation_option/userdetail"
        component={UserDetail}
      />
      <Route from="/pay/success/:pdt" component={Success} />
      <Route from="/pay/success" component={Success} />
      <Route from="/pay/error" component={Error} />
      <Route from="/" component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
