import React from "react";
import { useRouteMatch } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import ContentLayout from "../../layouts/ContentLayout";
import HeaderLayout from "../../layouts/HeaderLayout";
import Redirection from "./redirection";
import UserDetail from "./userdetail";

export default function Registration(props) {
  let { path } = useRouteMatch();
  return (
    <>
      <HeaderLayout />
      <ContentLayout>
        <Switch>
          <Route exact from={`${path}/success/:id`} component={Redirection}/>
          <Route exact from={`${path}/:id`} component={UserDetail}/>
      </Switch>
      </ContentLayout>
    </>
  );
}
