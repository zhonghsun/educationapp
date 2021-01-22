import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const QuestionHintInput = (props: Props) => {
  return (
    <Form.Group as={Row}>
      <Form.Label column md="3" sm="4" className="mb-0 px-3">
        Hint:
      </Form.Label>
      <Col className="pr-3">
        <Form.Control
          type="text"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
      </Col>
    </Form.Group>
  );
};

export default QuestionHintInput;
