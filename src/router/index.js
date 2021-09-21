import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// pages
import Dashboard from "../pages/dashboard";
import PageNotFound from "../pages/not-found";

import routeConstants from "../constants/routes";

const appRoutes = [
  {
    path: routeConstants.DASHBOARD,
    component: Dashboard,
  },
];

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Redirect to={routeConstants.DASHBOARD} />}
        />
        {appRoutes.map((route) => (
          <Route
            path={route.path}
            component={route.component}
            key={route.path}
          />
        ))}
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
