import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import './Challenge.css';
import { API } from 'aws-amplify';
import { LinkContainer } from 'react-router-bootstrap';
import { faPlus, faCloudUploadAlt, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LabelledIconButton from '../components/LabelledIconButton';

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
        console.log(notes)
        setNotes(notes);
      } catch (e) {
        alert(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  function loadNotes() {
    return JSON.parse(
      `[{"date":1586591804446,"imageUrl":null,"questions":[{"options":["Give you up","Let you down","Run around","Desert you"],"question":"Never gonna","type":"mcq","answer":"Give you up","hints":"???"},{"options":["MOS","LJS","Wendys","NONE"],"question":"KFC or MAC??","type":"mcq","answer":"NONE","hints":"Just press any one lol. They are all correct"},{"options":["pork","pork","chop","NONE"],"question":"fish or chicken??","type":"mcq","answer":"NONE","hints":"Just press any one lol. They are all correct"},{"options":["Merlion","singapore","malayisa","india"],"question":"tiger or lion??","type":"mcq","answer":"Merlion","hints":"Just press any one lol. They are all correct"}],"id":"fc946cd0-7bc9-11ea-a720-0f1daaccfbe7","title":"Testing your science"},{"date":1582477116973,"imageUrl":null,"questions":[{"options":["Give you up","Let you down","Run around","Desert you"],"question":"Never gonna","type":"mcq","answer":"Give you up","hints":"???"},{"options":["MOS","LJS","Wendys","NONE"],"question":"KFC or MAC??","type":"mcq","answer":"NONE","hints":"Just press any one lol. They are all correct"},{"options":["pork","pork","chop","NONE"],"question":"fish or chicken??","type":"mcq","answer":"NONE","hints":"Just press any one lol. They are all correct"},{"options":["Merlion","singapore","malayisa","india"],"question":"tiger or lion??","type":"mcq","answer":"Merlion","hints":"Just press any one lol. They are all correct"}],"id":"bbba7dd0-565d-11ea-b1a9-bfa0c7b116f0","title":"Testing your science"},{"questions":[{"options":["Home","School","Not Home","Not School"],"answer":"Not School","question":"Where are you now?","type":"mcq","hints":"No hints found. Sry."},{"options":["Studying","Working","Sleeping","Exercising"],"answer":"Sleeping","question":"What are you doing now?","type":"mcq","hints":"???"},{"options":["Bak kwa","Pineapple tarts","Kueh bahulu","Oranges"],"answer":"Bak kwa","question":"Which one best?","type":"mcq","hints":"Most unhealthy"}],"date":1581002787000,"imageUrl":null,"id":"3e23bbce114b4a529268a4407a317fca","userId":"us-east-2:a51db608-0680-4c7d-9c3b-236a80b9fc57","title":"Term 1"}]`
    );
    return API.get('challenges', '/challenges');
  }

  function renderNotesList(notes) {
    return [{}].concat(notes).map((note, i) =>
      i !== 0 ? (
        <LinkContainer key={note.id} to={`/challenges/${note.id}`}>
          <ListGroup.Item className="clickable">
            <div className="d-flex align-items-center text-left p-2">
              <div className="flex-fill">{note.title}</div>
              <div className="mr-2">{new Date(note.date).toLocaleDateString()}</div>
              <LabelledIconButton icon={faPen} className="mx-2">
                Edit Challenge
              </LabelledIconButton>
              <LabelledIconButton icon={faTrash} className="mx-2">
                Delete Challenge
              </LabelledIconButton>
            </div>
          </ListGroup.Item>
        </LinkContainer>
      ) : (
        <div style={{ display: 'flex' }}>
          <LinkContainer style={{ width: '50%' }} key="new" to="/challenge/new">
            <ListGroup.Item className="clickable font-weight-bold">
              <FontAwesomeIcon icon={faPlus} /> Create a new Challenge
            </ListGroup.Item>
          </LinkContainer>
          <LinkContainer style={{ width: '50%' }} key="new" to="/upload">
            <ListGroup.Item className="clickable font-weight-bold">
              <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload Challenge
            </ListGroup.Item>
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
        <h3 className="m-4">Your Term Challenges</h3>
        <ListGroup>{!isLoading && renderNotesList(notes)}</ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}
