import React from "react";
import { useFormFields } from "libs/hooksLib";
import { connectAuthContext, AuthState } from "contexts/AuthContext";
import { Auth } from "aws-amplify";
import { FormGroup, FormLabel, FormControl } from "react-bootstrap";
import LoaderButton from "components/LoaderButton";
import { useHistory } from "react-router";
import styles from "./LoginPageLoginForm.module.scss";

interface Props {
  setHasAuthenticated: (isAuth: boolean) => void;
}

const LoginPageLoginForm = (props: Props) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const user = await Auth.signIn(fields.email, fields.password);
      if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
        await Auth.completeNewPassword(user, "A123321a!", { name: "dog" });
      }

      // console.log((await Auth.currentSession()).getIdToken().getJwtToken());
      props.setHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  const canSubmit = validateForm();

  return (
    <div className="d-flex flex-column">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl autoFocus type="text" value={fields.email} onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl type="password" value={fields.password} onChange={handleFieldChange} />
        </FormGroup>
        <LoaderButton
          block
          className={styles.loginButton}
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!canSubmit}
        >
          Login
        </LoaderButton>
      </form>
    </div>
  );
};

const selectSetHasAuth = (authState: AuthState) => ({ setHasAuthenticated: authState.setAuthenticated });

export default connectAuthContext(selectSetHasAuth)(React.memo(LoginPageLoginForm));
