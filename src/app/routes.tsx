import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { Alert, PageSection } from "@patternfly/react-core";
import { DynamicImport } from "@app/DynamicImport";
import { accessibleRouteChangeHandler } from "@app/utils/utils";
import { Dashboard } from "@app/Dashboard/Dashboard";
import { NotFound } from "@app/NotFound/NotFound";
import { useDocumentTitle } from "@app/utils/useDocumentTitle";
import { FaBuilding } from "react-icons/fa";

import { useLastLocation, LastLocationProvider} from "react-router-last-location";
import {CubesIcon} from "@patternfly/react-icons";

let routeFocusTimer: number;


export interface IAppRoute {
  label?: string;
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  icon?: any;
  exact?: boolean;
  path: string;
  title: string;
  isAsync?: boolean;
}

const routes: IAppRoute[] = [
  {
    component: Dashboard,
    exact: true,
    icon: null,
    label: "Dashboard",
    path: "/",
    title: "Main Dashboard"
  }
];

// a custom hook for sending focus to the primary content container
// after a view has loaded so that subsequent press of tab key
// sends focus directly to relevant content
const useA11yRouteChange = (isAsync: boolean) => {
  const lastNavigation = useLastLocation();
  React.useEffect(() => {
    if (!isAsync && lastNavigation !== null) {
      routeFocusTimer = accessibleRouteChangeHandler();
    }
    return () => {
      clearTimeout(routeFocusTimer);
    };
  }, [isAsync, lastNavigation]);
};

const RouteWithTitleUpdates = ({
  component: Component,
  isAsync = false,
  title,
  ...rest
}: IAppRoute) => {
  useA11yRouteChange(isAsync);
  useDocumentTitle(title);

  function routeWithTitle(routeProps: RouteComponentProps) {
    return <Component {...rest} {...routeProps} />;
  }

  return <Route render={routeWithTitle} />;
};

const PageNotFound = ({ title }: { title: string }) => {
  useDocumentTitle(title);
  return <Route component={NotFound} />;
};

const AppRoutes = () => (
  <LastLocationProvider>
    <Switch>
      {routes.map(({ path, exact, component, title, isAsync, icon }, idx) => (
        <RouteWithTitleUpdates
          path={path}
          exact={exact}
          component={component}
          key={idx}
          icon={icon}
          title={title}
          isAsync={isAsync}
        />
      ))}
      <PageNotFound title={"404 Page Not Found"} />
    </Switch>
  </LastLocationProvider>
);

export { AppRoutes, routes };
