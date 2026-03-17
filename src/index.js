import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from "./redux/store";
import * as Sentry from "@sentry/react";

const sentryDsn = window.APP_CONFIG?.SENTRY_DSN;
if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    environment: window.APP_CONFIG?.SENTRY_ENVIRONMENT || "production",
  });
}

const AppRoot = sentryDsn ? (
  <Sentry.ErrorBoundary
    fallback={
      <div style={{ textAlign: "center", padding: 40 }}>
        <p>An unexpected error occurred.</p>
        <button onClick={() => window.location.reload()}>Reload page</button>
      </div>
    }
  >
    <App />
  </Sentry.ErrorBoundary>
) : (
  <App />
);

ReactDOM.render(
  <Provider store={store}>{AppRoot}</Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
