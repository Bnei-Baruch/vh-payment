import "./i18n";
import React from "react";
import Auth from "./components/Auth";
import axios from "axios";
import store from "./redux/store";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
let token;
store.subscribe(listener);

//Token Middleware implmentation for the Application.
function getToken(state) {
  if (state && state.user && state.user.keycloak && state.user.keycloak.token)
    return state.user.keycloak.token;
}

function listener() {
  token = getToken(store.getState());
}
axios.interceptors.request.use((c) => {
  if (
    token &&
    c.url &&
    c.url.includes(window.APP_CONFIG.VH_BASE_URL.replace(/(^\w+:|^)\/\//, ""))
  ) {
    let header = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    c.headers = header;
  }
  return c;
});

const App = () => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Auth />
    </MuiPickersUtilsProvider>
  );
};

export default App;
