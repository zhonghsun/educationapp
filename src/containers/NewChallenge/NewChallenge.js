import React, { useRef, useState } from 'react';
import {
  Form,
  FormLabel,
  Accordion,
  ListGroup,
  Modal,
  Button,
} from 'react-bootstrap';
import LoaderButton from '../../components/LoaderButton';
import config from '../../config';
import './NewChallenge.css';
import { API } from 'aws-amplify';
import { s3Upload } from '../../libs/awsLib';
import CollapsiblePanel from '../../components/CollapsiblePanel';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import LabelledIconButton from '../../components/LabelledIconButton';
import QuestionsModal from '../../components/QuestionsModal';
import CollapsiblePanelListItem from '../../components/CollapsiblePanelListItem';
import { TermChallenge } from '../../models/TermChallenge';
import produce from 'immer';
import { isValued } from '../../utils/objectUtils';
import IndivChallenges from './IndivChallenges';

export default function NewChallenge(props) {
  const file = useRef(null);
  const [challenges, setChallenges] = useState([]);
  const [termChallenge, setTermChallenge] = useState(new TermChallenge());
  const [isLoading, setIsLoading] = useState(false);
  const [editQn, setEditQn] = React.useState(null);

  function validateForm() {
    return termChallenge.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      // const attachment = file.current ? await s3Upload(file.current) : null;

      await createChallenge(termChallenge);
      props.history.push('/challenge');
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function createChallenge(note) {
    return API.post('challenges', '/challenge', {
      body: note,
    });
  }

  function updateTermChallenge(tc) {
    const updated = produce(termChallenge, (draft) => {
      draft.title = isValued(tc.title) ? tc.title : draft.title;
      draft.topics = isValued(tc.topics) ? tc.topics : draft.topics;
      draft.challengeIds = isValued(tc.challengeIds)
        ? tc.challengeIds
        : draft.challengeIds;
    });
    setTermChallenge(updated);
  }

  function updateIndivChallenge(idx, c) {
    const updated = produce(challenges, (drafts) => {
      const draft = drafts[idx];
      if (!draft) {
        drafts[idx] = c;
      } else {
        draft.title = isValued(c.title) ? c.title : draft.title;
        draft.imageUrl = isValued(c.imageUrl) ? c.imageUrl : draft.imageUrl;
        draft.questions = isValued(c.questions) ? c.questions : draft.questions;
      }
    });
    setChallenges(updated);
  }

  function deleteIndivChallenge(idx) {
    setChallenges(
      produce(challenges, (drafts) => {
        drafts.splice(idx, 1);
      })
    );
  }

  function handleOpenEditQuestion(cIdx) {
    setEditQn({ cIdx });
  }

  return (
    <div className="NewNote">
      <form onSubmit={handleSubmit}>
        <h3 className="my-4">Create New Term Challenge</h3>
        <h5>Title</h5>
        <Form.Group controlId="title">
          <Form.Control
            value={termChallenge.title}
            componentType="text"
            onChange={(e) => updateTermChallenge({ title: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="missions">
          <h5>Missions</h5>
          <IndivChallenges
            challenges={challenges}
            onChange={updateIndivChallenge}
            onDelete={deleteIndivChallenge}
            onEditQuestion={handleOpenEditQuestion}
          />
        </Form.Group>
        <Form.Group controlId="file">
          <FormLabel>Attachment</FormLabel>
          <Form.Control onChange={handleFileChange} type="file" />
        </Form.Group>
        <QuestionsModal show={editQn} title="Test" onClose={() => setEditQn(null)} />
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </form>
    </div>
  );
}
