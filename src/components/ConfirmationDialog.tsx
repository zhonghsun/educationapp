import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface Props {
  show: boolean;
  title?: string;
  description?: string;
  onConfirm?: () => void;
  onClose?: () => void;
  variant?: 'primary' | 'danger';
  labelConfirm?: string;
  labelCancel?: string;
}

const ConfirmationDialog = (props: Props) => {
  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.description}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          {props.labelCancel}
        </Button>
        <Button variant={props.variant} onClick={props.onConfirm}>
          {props.labelConfirm}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ConfirmationDialog.defaultProps = {
  title: 'Confirm?',
  description: 'Are you sure?',
  labelConfirm: 'OK',
  labelCancel: 'Cancel',
};

export default ConfirmationDialog;
