import React, { useState } from "react";
import "@patternfly/react-core/dist/styles/base.css";
import { AppLayout } from "@app/AppLayout/AppLayout";
import { AppRoutes } from "@app/routes";
import "@app/app.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "@app/Login/Login";
import useToken from "@app/Login/useToken";

const App: React.FunctionComponent = () => {
  const {token, setToken} = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <Router>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </Router>
  );
};

export { App };
