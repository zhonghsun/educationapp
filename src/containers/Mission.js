import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import "./Mission.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default function Home(props) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }
  
      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        alert(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [props.isAuthenticated]);
  
  function loadNotes() {
    return API.get("mission", "/mission");
  }

  function renderNotesList(notes) {
    return [{}].concat(notes).map((note, i) =>
      i !== 0 ? (
        <LinkContainer key={note.id} to={`/mission/${note.id}`}>
          <ListGroupItem header={note.title}>
            {"Created: " + new Date(note.createdAt).toLocaleString()}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <div style={{display:'flex'}}>
        <LinkContainer style={{width:'50%'}} key="new" to="/notes/new">
          <ListGroupItem>
            <h4 >
              <b>{"\uFF0B"}</b> Create a new Mission
            </h4>
          </ListGroupItem>
        </LinkContainer>
        <LinkContainer style={{width:'50%'}} key="new" to="/upload">
          <ListGroupItem>
            <h4>
              <b></b> Upload Mission
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

  function renderNotes() {
    return (
      <div className="notes">
        <h2>The list of Mission</h2>
        <ListGroup>
          {!isLoading && renderNotesList(notes)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="root">
      {props.isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}