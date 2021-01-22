import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import styles from "./HomePage.module.scss";
import { testVenues } from "../../testFuncs/testVenues";
import { testMissions } from "../../testFuncs/testMissions";
import { testTerms } from "../../testFuncs/testTerms";
import { testChallenges } from "../../testFuncs/testChallenges";
import AppSideBar from "components/AppSideBar/AppSideBar";
import AppStandardNavBarContent from "components/AppStandardNavBarContent/AppStandardNavBarContent";
import { Auth } from "aws-amplify";
import Scaffold from "components/Scaffold/Scaffold";

export default function HomePage(props) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = React.useState("");

  // Get user name
  useEffect(() => {
    const loadCurrentUserName = async () => {
      setName((await Auth.currentAuthenticatedUser()).attributes.name);
    };
    loadCurrentUserName();
  }, []);

  // async function performAllTests() {
  //   try {
  //     await testVenues();
  //     await testMissions();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  const makeTestFunc = (func) => async () => {
    try {
      await func();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Scaffold>
      <div className="container py-5">
        <h1 className="mb-4">Hello{name ? ", " + name : ""}</h1>
        <h5 className="mb-3">Welcome to your admin dashboard.</h5>
        <h5 className="mb-3">Start by selecting one of the options on the menu to the left.</h5>
      </div>
    </Scaffold>
  );
}

// <ListGroup>
//   <button onClick={makeTestFunc(testVenues)}>Test Venues</button>
//   <button onClick={makeTestFunc(testMissions)}>Test Missions</button>
//   <button onClick={makeTestFunc(testTerms)}>Test Terms</button>
//   <button onClick={makeTestFunc(testChallenges)}>Test Challenges</button>
// </ListGroup>
