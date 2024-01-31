import React, { Suspense, lazy, Fragment } from "react";
import { History } from "history";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { Dispatch } from "redux";
import { Container } from "semantic-ui-react";
import { PrivateRoute } from "views/components/private-route/PrivateRoute";
import SidebarContainers from "./components/sidebar-containers/SidebarContainers";
import IAction from "../models/IAction";
import RouteEnum from "../constants/RouteEnum";
import NavBar from "./components/nav-bar/NavBar";
import SidebarNav from "./components/sidebar-nav/SidebarNav";
import LoadingIndicator from "./components/loading-indicator/LoadingIndicator";
import Toasts from "./components/toasts/Toasts";
import ModalContainers from "./components/modals/ModalContainers";
import ModalNoPadding from "./components/modals/ModalNoPadding";
import DashboardPage from "./dashboard-page/DashboardPage";

const FunnelOpportunity = lazy(() =>
  import("./funnel-opportunity/FunnelOpportunity")
);
const CustomerSetting = lazy(() =>
  import("./customer-setting/CustomerSetting")
);

const ViewCustomerSetting = lazy(() =>
  import("./view-customer-setting/ViewEditCustomerSettingPage")
);

const CustomerSettingPage = lazy(() =>
  import("./customer-setting-page/CustomerSettingPage")
);

const LoginPage = lazy(() => import("./login-page/LoginPage"));

interface RouteParams {
  id: string;
}

interface IProps {
  readonly history: History;
  readonly dispatch: Dispatch<IAction<any>>;
}

const App: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => (
  <ConnectedRouter history={props.history}>
    <Suspense fallback={<LoadingIndicator isActive />}>
      <ModalContainers isChild={false} />
      <ModalNoPadding isChild={false} />
      <Route exact path={RouteEnum.Home} component={LoginPage} />
      <Route
        path="/(.+)"
        render={() => (
          <>
            <NavBar history={props.history} />
            <SidebarNav size="very thin" />
            <SidebarContainers />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                {/* <Route
                  path={RouteEnum.FunnelOpportunity}
                  component={FunnelOpportunity}
                />{" "} */}
                <Route
                  path="/customer-setting/:id(\d+)"
                  component={ViewCustomerSetting}
                />
                <Route
                  path={RouteEnum.CustomerSetting}
                  component={CustomerSettingPage}
                />
                {/* <Route path={RouteEnum.Dashboard} component={DashboardPage} /> */}
              </Switch>
            </Container>
          </>
        )}
      />

      <Toasts />
    </Suspense>
  </ConnectedRouter>
);

export default App;
