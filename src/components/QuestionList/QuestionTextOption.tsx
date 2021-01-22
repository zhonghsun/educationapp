import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

interface Props {
  answer: string;
  onSetAnswer: (option: string) => void;
}

const QuestionTextOption = (props: Props) => {
  const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onSetAnswer(e.target.value);
  };

  return (
    <Form.Group as={Row}>
      <Form.Label column md="3" sm="4" className="mb-0 px-3">
        Answer:
      </Form.Label>
      <Col className="pr-3">
        <Form.Control
          type="text"
          value={props.answer}
          onChange={handleChangeAnswer}
        />
      </Col>
    </Form.Group>
  );
};

export default QuestionTextOption;
