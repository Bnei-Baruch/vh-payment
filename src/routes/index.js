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
import HelpHaverSuccess from "../pages/Success/helphaversuccess";
import MembershipIntersticial from "../pages/Order/Interesticial/membershipIntersticial";
import HelpHaver from "../pages/Order/Interesticial/helphaver";
import SpecialOption from "../pages/Order/SpecialOption/SpecialOption";
import SpecialOptionInterestical from "../pages/Order/Interesticial/specialoption";
import SpecialOptionSuccess from "../pages/Success/specialoptionsuccess";
import MembershipHelphaver from "../pages/Order/Interesticial/membershipHelpHaver";
import SuccessMembership from "../pages/Success/SuccessMembership";
import UserDetails from "../pages/Order/HelpHaverConfirmation/UserDetails";
import SucessMembershipHelpHaver from "../pages/Success/SucessMembershipHelpHaver";
import PreCancellation from "../pages/Cancellation/precancellation";
import CancelConfirmation from "../pages/Cancellation/cancellationConfirmation";
import CancellationSuccess from "../pages/Success/cancellationSuccess";
import MembershippaymentCancel from "../pages/Error/MembershippaymentCancel";
import MembershippaymentError from "../pages/Error/MembershippaymentError";
import UpdatePayment from "../pages/Order/Membership/UpdatePayment";
import UpdatePaymentDetailSuccess from "../pages/Success/UpdatePaymentDetailSuccess";

const Routes = () => (
  <Router>
    <Switch>
      {/* Old Membership Route */}
      {!window.APP_CONFIG.isMembershipV2 &&
        <Route exact from="/pay/order/:id" component={Order} />
      }

      {/* Membership Cancellation Route */}
      <Route
        exact
        from="/pay/membership/cancellation"
        component={PreCancellation}
      />
      <Route
        exact
        from="/pay/membership/cancellation/confirm"
        component={CancelConfirmation}
      />
      <Route
        exact
        from="/pay/membership/cancellation/success"
        component={CancellationSuccess}
      />

      {/* Membership Routes */}
      <Route exact from="/pay/membership" component={Membership} />
      <Route
        exact
        from="/pay/membership/payment/update/:orderId"
        component={UpdatePayment}
      />
      <Route
        exact
        from="/pay/membership/payment/update/:orderId/success"
        component={UpdatePaymentDetailSuccess}
      />
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
      <Route
        exact
        from="/pay/order/membership/payment/intersticial/:event_slug"
        component={MembershipHelphaver}
      />
      <Route
        exact
        from="/pay/order/membership/:event_slug/userdetail"
        component={UserDetails}
      />
      <Route
        exact
        from="/pay/order/ticket/payment/membership/:event_slug"
        component={MembershipIntersticial}
      />
      <Route
        exact
        from="/pay/order/membership/successhelphaver"
        component={SucessMembershipHelpHaver}
      />
      <Route
        exact
        from="/pay/success/membership"
        component={SuccessMembership}
      />

      <Route
        exact
        from="/pay/success/globalmembership"
        component={SuccessMembership}
      />

      {/* Ticket and Events Routes */}

      <Route exact from="/pay/order/ticket/:event_slug" component={Ticket} />
      <Route
        exact
        from="/pay/order/ticket/payment/:event_slug"
        component={Payment}
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
      <Route from="/pay/success/:pdt/:option" component={Success} />

      {/* common Routes */}

      <Route
        from="/payment/membership/cancel"
        component={MembershippaymentCancel}
      />
      <Route
        from="/payment/membership/error"
        component={MembershippaymentError}
      />
      <Route from="/pay/error" component={Error} />
      <Route from="/" component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
