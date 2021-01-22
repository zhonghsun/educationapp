import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./containers/HomePage/HomePage";
import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import Settings from "./containers/Settings";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import TermsPage from "./containers/TermsPage/TermsPage";
import NewTerm from "./containers/NewTerm/NewTerm";
import EditTerm from "containers/NewTerm/EditTerm";
import ViewTerm from "./containers/ViewTerm/ViewTerm";
import VenuesPage from "./containers/VenuesPage/VenuesPage";
import NewVenue from "containers/NewVenue/NewVenue";
import ViewVenue from "containers/ViewVenue/ViewVenue";
import EditVenue from "containers/NewVenue/EditVenue";
import UsersPage from "containers/UsersPage/UsersPage";
import LoginPage from "containers/LoginPage/LoginPage";
import AppSideBar from "components/AppSideBar/AppSideBar";
import AppStandardNavBarContent from "components/AppStandardNavBarContent/AppStandardNavBarContent";

export default function Routes({ appProps }) {
  return (
    <>
      <Switch>
        {/* Do not show nav bar on login page */}
        <Route path="/login" exact />
        {/* Fallthrough for all other (authenticated) routes */}
        <Route path="/">
          <AppSideBar>
            <AppStandardNavBarContent />
          </AppSideBar>
        </Route>
      </Switch>
      <Switch>
        <AppliedRoute path="/" exact component={HomePage} appProps={appProps} />
        <UnauthenticatedRoute path="/login" exact component={LoginPage} appProps={appProps} />
        <UnauthenticatedRoute path="/signup" exact component={Signup} appProps={appProps} />
        <AuthenticatedRoute path="/settings" exact component={Settings} appProps={appProps} />
        <AuthenticatedRoute path="/users" exact component={UsersPage} appProps={appProps} />
        <AuthenticatedRoute path="/venue" exact component={VenuesPage} appProps={appProps} />
        <AuthenticatedRoute path="/venue/new" exact component={NewVenue} appProps={appProps} />
        <AuthenticatedRoute path="/venue/:id" exact component={ViewVenue} appProps={appProps} />
        <AuthenticatedRoute path="/venue/:id/edit" exact component={EditVenue} appProps={appProps} />
        <AuthenticatedRoute path="/challenge" exact component={TermsPage} appProps={appProps} />
        <AuthenticatedRoute path="/challenge/new" exact component={NewTerm} appProps={appProps} />
        <AuthenticatedRoute path="/challenge/:id" exact component={ViewTerm} appProps={appProps} />
        <AuthenticatedRoute path="/challenge/:id/edit" exact component={EditTerm} appProps={appProps} />
        {/* Finally, catch all unmatched routes */}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}
