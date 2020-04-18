import React from 'react';
import { Accordion, Form, ListGroup, Card } from 'react-bootstrap';
import CollapsiblePanel from '../../components/CollapsiblePanel';
import CollapsiblePanelListItem from '../../components/CollapsiblePanelListItem';
import LabelledIconButton from '../../components/LabelledIconButton';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Challenge } from '../../models/TermChallenge';

const IndivChallenges = ({ challenges, onChange, onDelete, onEditQuestion }) => {
  const addNewChallenge = () => {
    onChange(challenges.length, new Challenge());
  };

  const handleDeleteChallenge = (e, idx) => {
    e.stopPropagation();
    console.log(123123);
    onDelete(idx);
  };

  const editChallengeTitle = (idx, title) => {
    onChange(idx, { title });
  };

  return (
    <Accordion defaultActiveKey="0" className="text-left">
      {challenges.map((challenge, idx) => (
        <CollapsiblePanel
          headerClass="clickable m-2"
          eventKey={idx}
          title={
            <CollapsiblePanelListItem
              idx={idx}
              placeholder="Untitled"
              title={challenge.title}
              qnsNum={challenge.questions.length}
              decorator={
                <LabelledIconButton
                  onClick={(e) => handleDeleteChallenge(e, idx)}
                  icon={faTrash}
                  className="btn-delete ml-4"
                >
                  Delete
                </LabelledIconButton>
              }
            />
          }
        >
          <Form.Group>
            <Form.Label>Individual Challenge Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={challenge.title}
              onChange={(e) => editChallengeTitle(idx, e.target.value)}
            />
          </Form.Group>
          <div className="d-flex w-100">
            <div className="flex-fill mb-2">Questions</div>
            <LabelledIconButton
              onClick={() => onEditQuestion(idx)}
              icon={faPen}
              className="mx-4"
            >
              Edit Questions
            </LabelledIconButton>
          </div>
          <ListGroup>
            <ListGroup.Item className="d-flex">
              <div>Qn 1.</div>
              <div className="flex-fill mx-4">What is 5x2?</div>
              <div>Answer: 10</div>
            </ListGroup.Item>
          </ListGroup>
        </CollapsiblePanel>
      ))}
      <Card className="link font-italic text-center" onClick={addNewChallenge}>
        <Card.Header className="text-primary">
          Click to add new individual challenge
        </Card.Header>
      </Card>
    </Accordion>
  );
};

export default IndivChallenges;
