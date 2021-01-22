import React from "react";
import Routes from "./Routes";
import { DialogRenderer } from "services/DialogService";
import { connectAuthContext, AuthState } from "contexts/AuthContext";
import OnLoadAuthenticator from "components/OnLoadAuthenticator";
import "./App.css";
import "./styles/buttons.scss";
import "./styles/cards.scss";
import "./styles/icons.scss";

interface Props extends AuthState {}

function App(props: Props) {
  return (
    <>
    <div style={{zIndex: -1, position: 'fixed', top:0,left:0,bottom:0,right:0, background: 'linear-gradient(180deg, rgba(251,254,251,1) 0%, rgba(238,250,239,1) 75%, rgba(233,249,234,1) 100%)'}} />
      <OnLoadAuthenticator />
      {props.hasCompletedFirstLoad ? (
        <>
          <DialogRenderer />
          <Routes
            appProps={{
              isAuthenticated: props.isAuthenticated,
              userHasAuthenticated: props.setAuthenticated,
            }}
          />
        </>
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </>
  );
}

const selectAuthState = (state: AuthState) => state;

export default connectAuthContext(selectAuthState)(React.memo(App));
