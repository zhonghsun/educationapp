import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import Notes from "./containers/Notes";
import Settings from "./containers/Settings";
import mission from "./containers/Mission";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Mission from "./containers/Mission";
import Challenge from "./containers/Challenge";
import NewChallenge from "./containers/NewChallenge/NewChallenge";
import ChallengeEdit from "./containers/ChallengeEdit";
import Venues from "./containers/venues/Venues";
import Venue from "./containers/venues/Venue";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <UnauthenticatedRoute path="/login" exact component={Login} appProps={appProps} />
      <UnauthenticatedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AuthenticatedRoute path="/settings" exact component={Settings} appProps={appProps} />
      <AuthenticatedRoute path="/venues" exact component={Venues} appProps={appProps} />
      <AuthenticatedRoute path="/venues/:id" exact component={Venue} appProps={appProps} />
      <AuthenticatedRoute path="/mission" exact component={Mission} appProps={appProps} />
      <AuthenticatedRoute path="/mission/new" exact component={NewNote} appProps={appProps} />
      <AuthenticatedRoute path="/mission/:id" exact component={Notes} appProps={appProps} />
      <AuthenticatedRoute path="/challenge" exact component={Challenge} appProps={appProps} />
      <AuthenticatedRoute path="/challenge/new" exact component={NewChallenge} appProps={appProps} />
      <AuthenticatedRoute path="/challenge/:id" exact component={ChallengeEdit} appProps={appProps} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}