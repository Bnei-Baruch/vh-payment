import React from "react";
import { useRouteMatch } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import ContentLayout from "../../layouts/ContentLayout";
import Redirection from "./redirection";
import UserDetail from "./userdetail";

export default function Registration(props) {
  let { path } = useRouteMatch();
  return (
    <ContentLayout>
      <Switch>
        <Route
          exact
          from={`${path}/success/:event_slug`}
          component={Redirection}
        />
        <Route exact from={`${path}/:event_slug`} component={UserDetail} />
      </Switch>
    </ContentLayout>
  );
}
