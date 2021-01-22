import React from "react";
import { AuthState, connectAuthContext } from "contexts/AuthContext";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router";

interface Props {
  isAuthenticated: boolean;
  setAuthenticated: (isAuth: boolean) => void;
}

const AppNavBar = (props: Props) => {
  const history = useHistory();

  const handleLogout = async () => {
    await Auth.signOut();

    props.setAuthenticated(false);
    history.push("/login");
  };

  return (
    <Navbar collapseOnSelect expand="md" bg="light" variant="light">
      <Navbar.Brand>
        <Link to="/">
          <div>Home</div>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar" />
      <Navbar.Collapse>
        <Nav>
          {props.isAuthenticated ? (
            <>
              <LinkContainer to="/challenge">
                <Nav.Link>Term Challenges</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/venue">
                <Nav.Link>Venues</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/users">
                <Nav.Link>Users</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/settings">
                <Nav.Link>Settings</Nav.Link>
              </LinkContainer>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
          ) : (
            <>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/signup">
                <Nav.Link>Signup</Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const selectAuthState = (state: AuthState) => state;

export default connectAuthContext(selectAuthState)(React.memo(AppNavBar));
