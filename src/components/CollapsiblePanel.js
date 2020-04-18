import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

const CollapsiblePanel = ({ headerClass, bodyClass, title, eventKey, children }) => {
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle as="div" eventKey={eventKey} className={headerClass}>
          {title}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={eventKey}>
        <Card.Body className={bodyClass}>{children}</Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default CollapsiblePanel;
