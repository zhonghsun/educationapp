import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import './Home.css';
import { API } from 'aws-amplify';
import { LinkContainer } from 'react-router-bootstrap';

import { testVenues } from '../testFuncs/testVenues';
import { testMissions } from '../testFuncs/testMissions';
import { testTerms } from '../testFuncs/testTerms';
import { testChallenges } from '../testFuncs/testChallenges';

export default function Home(props) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  // async function performAllTests() {
  //   try {
  //     await testVenues();
  //     await testMissions();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  const makeTestFunc = func => async () => {
    try {
      await func();
    } catch (e) {
      console.log(e);
    }
  };

  function renderLander() {
    return (
      <div className="lander">
        <h1>Admin website</h1>
      </div>
    );
  }

  function renderNotes() {
    return (
      <div className="notes">
        <h2>Admin website</h2>
        <ListGroup>
          <button onClick={makeTestFunc(testVenues)}>Test Venues</button>
          <button onClick={makeTestFunc(testMissions)}>Test Missions</button>
          <button onClick={makeTestFunc(testTerms)}>Test Terms</button>
          <button onClick={makeTestFunc(testChallenges)}>Test Challenges</button>
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}
