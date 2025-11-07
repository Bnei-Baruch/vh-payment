import "./i18n";
import React from "react";
import Auth from "./components/Auth";
import axios from "axios";
import store from "./redux/store";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

/**
 * Axios interceptor for token updation
 * and appending token in api's
 */
axios.interceptors.request.use(async (c) => {
  if (c && c.url && c.url.includes("heartbeat")) {
    return c;
  }
  const state = store.getState();
  if (
    state.user.keycloak &&
    state.user.keycloak.isTokenExpired()
  ) {
    await state.user.keycloak.updateToken(30).success();
  }
  //fetch token and pass here
  if (state.user.keycloak.token) {
    let header = {
      Authorization: "Bearer " + state.user.keycloak.token,
      Accept: "application/json",
    };
    c.headers = header;
  }
  return c;
});

const App = () => {
  React.useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Auth />
    </MuiPickersUtilsProvider>
  );
};

export default App;
