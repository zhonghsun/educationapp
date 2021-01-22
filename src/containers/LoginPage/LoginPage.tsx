import React from "react";
import styles from "./LoginPage.module.scss";
import LoginPageLoginForm from "./LoginPageLoginForm";
import { AuthState, connectAuthContext } from "contexts/AuthContext";
import { useHistory } from "react-router";

interface Props {
  isAuthenticated: boolean;
}

const LoginPage = (props: Props) => {
  const history = useHistory();
  console.log("Login page works!", props.isAuthenticated)

  React.useEffect(() => {
    if (props.isAuthenticated) {
      history.push("/");
    }
  }, [props.isAuthenticated]);

  return (
    <div className="d-flex flex-column h-100">
      <div className={styles.backgroundContainer}>
        <div className={styles.background} />
      </div>

      <div className={styles.formContainer}>
        <h3 className="font-weight-bold text-center">Admin Dashboard</h3>
        <p className="text-center mt-3">Please login to access your administrators' dashboard</p>
        <LoginPageLoginForm />
      </div>
    </div>
  );
};

const selectSetHasAuth = (authState: AuthState) => ({ setHasAuthenticated: authState.setAuthenticated });

export default connectAuthContext(selectSetHasAuth)(React.memo(LoginPage));
