import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ButtonOptions } from 'models/ButtonOptions';

interface Props {
  onClose?: () => void;
  show?: boolean;
  title: string;
  body: string | JSX.Element;
  buttons: ButtonOptions[];
}

const Dialog = (props: Props) => {
  return (
    <Modal show onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{props.body}</Modal.Body>

      <Modal.Footer>
        {props.buttons.map((btn) => (
          <Button variant={btn.variant} onClick={btn.onClick}>
            {btn.label}
          </Button>
        ))}
      </Modal.Footer>
    </Modal>
  );
};

export default Dialog;
