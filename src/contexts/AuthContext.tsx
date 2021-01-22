import React from "react";
import produce from "immer";
import { connectContext } from "./connectContext";

export interface AuthState {
  isAuthenticated: boolean;
  hasCompletedFirstLoad: boolean;
  setAuthenticated: (isAuth: boolean) => void;
  setHasCompletedFirstLoad: (isComplete: boolean) => void;
}

const defaultState: AuthState = {
  isAuthenticated: false,
  hasCompletedFirstLoad: false,
  setAuthenticated: () => {},
  setHasCompletedFirstLoad: () => {},
};

const AuthContext = React.createContext<AuthState>(defaultState);

export const AuthProvider = (props: React.PropsWithChildren<{}>) => {
  const [authState, setAuthState] = React.useState(defaultState);

  const setAuthenticated = React.useCallback((isAuth: boolean) => {
    setAuthState((state) =>
      produce(state, (draft) => {
        draft.isAuthenticated = isAuth;
      })
    );
  }, []);

  const setHasCompletedFirstLoad = React.useCallback((isComplete: boolean) => {
    setAuthState((state) =>
      produce(state, (draft) => {
        draft.hasCompletedFirstLoad = isComplete;
      })
    );
  }, []);

  const value = React.useMemo(
    () => ({
      isAuthenticated: authState.isAuthenticated,
      hasCompletedFirstLoad: authState.hasCompletedFirstLoad,
      setAuthenticated,
      setHasCompletedFirstLoad,
    }),
    [authState]
  );

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};

export const connectAuthContext = <T extends {}>(selector: (state: AuthState) => T) =>
  connectContext(selector, AuthContext);
