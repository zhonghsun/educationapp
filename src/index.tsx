import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Amplify from "aws-amplify";
import config from "./config";
import { BrowserRouter as Router } from "react-router-dom";
import AppContextProviders from "AppContextProviders";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: "venues",
        endpoint: config.apiGateway.URL_VENUES,
        region: config.apiGateway.REGION,
      },
      {
        name: "missions",
        endpoint: config.apiGateway.URL_MISSION,
        region: config.apiGateway.REGION,
      },
      {
        name: "challenges",
        endpoint: config.apiGateway.URL_CHALLENGES,
        region: config.apiGateway.REGION,
      },
      {
        name: "terms",
        endpoint: config.apiGateway.URL_TERMS,
        region: config.apiGateway.REGION,
      },
      {
        name: "admin",
        endpoint: config.apiGateway.URL_ADMIN,
        region: config.apiGateway.REGION,
      },
    ],
  },
});

ReactDOM.render(
  <AppContextProviders>
    <Router>
      <App />
    </Router>
  </AppContextProviders>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
