import clsx from "clsx";
import React from "react";
import { Accordion, Card, Button } from "react-bootstrap";

const CollapsiblePanel = ({
  className = "",
  headerRootClass = "",
  headerClass = "",
  bodyClass = "",
  title,
  eventKey,
  children,
}) => {
  return (
    <Card className={className}>
      <div className={headerRootClass}>
        <Accordion.Toggle as="div" eventKey={eventKey} className={headerClass}>
          {title}
        </Accordion.Toggle>
      </div>
      <Accordion.Collapse eventKey={eventKey}>
        <Card.Body className={clsx("border-top", bodyClass)}>{children}</Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default CollapsiblePanel;
