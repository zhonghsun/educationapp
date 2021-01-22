import React from "react";
import { connectAuthContext, AuthState } from "contexts/AuthContext";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router";

interface Props extends AuthState {}

const OnLoadAuthenticator = (props: Props) => {
  const history = useHistory();

  React.useEffect(() => {
    async function onLoad() {
      try {
        await Auth.currentSession();
        // props.setAuthenticated(true);
      } catch (e) {
        if (e !== "No current user") {
          alert(e);
        } else {
          history.push("/login");
        }
      } finally {
        props.setHasCompletedFirstLoad(true);
      }
    }

    onLoad();
  }, []);

  return null;
};

export default connectAuthContext((state) => state)(React.memo(OnLoadAuthenticator));
