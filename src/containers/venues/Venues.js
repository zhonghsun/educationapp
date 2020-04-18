import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import "./Venues.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default function Venues(props) {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }
  
      try {
        const venues = await loadVenues();
        setVenues(venues);
      } catch (e) {
        alert(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [props.isAuthenticated]);
  
  function loadVenues() {
    return API.get("venues", "/venues");
  }

  function renderVenuesList(venues) {
    return [{}].concat(venues).map((note, i) =>
      i !== 0 ? (
        <LinkContainer key={note.id} to={`/venues/${note.id}`}>
          <ListGroupItem header={note.title}>
            {"Created: " + new Date(note.date).toLocaleString()}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <div style={{display:'flex'}}>
        <LinkContainer style={{width:'50%'}} key="new" to="/venues/new">
          <ListGroupItem>
            <h4 >
              <b>{"\uFF0B"}</b> Create a new Venue
            </h4>
          </ListGroupItem>
        </LinkContainer>
        <LinkContainer style={{width:'50%'}} key="new" to="/upload">
          <ListGroupItem>
            <h4>
              <b></b> Upload Venue
            </h4>
          </ListGroupItem>
        </LinkContainer>
        </div>
      )
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Admin website</h1>
      </div>
    );
  }

  function renderVenues() {
    return (
      <div className="venues">
        <h2>Your venues:</h2>
        <ListGroup>
          {!isLoading && renderVenuesList(venues)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderVenues() : renderLander()}
    </div>
  );
}