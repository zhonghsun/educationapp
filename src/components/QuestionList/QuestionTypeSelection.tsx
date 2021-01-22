import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const TypeLabels = {
  mcq: 'MCQ',
  text: 'Free Text',
};

interface Props {
  id: string;
  idx: number;
  qnType: string;
  onChange: (qnType: string) => void;
}

const QuestionTypeSelection = (props: Props) => {
  return (
    <Form.Group as={Row} id={props.id}>
      <Form.Label column md="3" sm="4" className="mb-0 px-3">
        Question Type:
      </Form.Label>
      <Col className="d-flex align-items-center">
        {['mcq', 'text'].map((qnType) => (
          <Form.Check
            key={qnType}
            inline
            custom
            type="radio"
            label={TypeLabels[qnType]}
            id={props.id + '-' + qnType}
            checked={props.qnType === qnType}
            onChange={() => props.onChange(qnType)}
          />
        ))}
      </Col>
    </Form.Group>
  );
};

export default QuestionTypeSelection;
