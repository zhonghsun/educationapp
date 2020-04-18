import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const QuestionsModal = ({ show, title, onClose }) => {
  return (
    <Modal show={show} size="lg" centered onHide={() => {}}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Questions for {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus
          ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur
          ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Save</Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuestionsModal;
