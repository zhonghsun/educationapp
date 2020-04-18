import { Nav, Navbar } from 'react-bootstrap';
import './App.css';
import Routes from './Routes';
import { LinkContainer } from 'react-router-bootstrap';
import { Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

function App(props) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);

    props.history.push('/login');
  }

  return !isAuthenticating ? (
    <div className="App container">
      <Navbar collapseOnSelect expand="md" bg="light" variant="light">
        <Navbar.Brand>
          <Link to="/">
            <div>Home</div>
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse>
          <Nav pullRight>
            {isAuthenticated ? (
              <>
                <LinkContainer to="/challenge">
                  <Nav.Link>Term Challenges</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/mission">
                  <Nav.Link>Mission</Nav.Link>
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
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  ) : (
    <div>123</div>
  );
}

export default withRouter(App);
