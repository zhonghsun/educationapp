import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SchoolIdInput = (props: Props) => {
  const handleChange = React.useCallback((e) => {
    props.onChange(e.target.value);
  }, []);

  return (
    <Form.Group as={Row}>
      <Form.Label column md="2" sm="3" className="mb-0">
        School ID:
      </Form.Label>
      <Col className="pr-3">
        <Form.Control type="text" value={props.value} onChange={handleChange} />
      </Col>
    </Form.Group>
  );
};

export default SchoolIdInput;
