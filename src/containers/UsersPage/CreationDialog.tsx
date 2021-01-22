import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import StudentCreationStatus from './models/StudentCreationStatus';
import StudentCreationJobResult from 'models/StudentCreationJobResult';
import LoadingIndicator from 'components/LoadingIndicator';

interface Props {
  onClose: () => void;
  status: StudentCreationStatus;
  result: StudentCreationJobResult;
}

const CreationDialog = (props: Props) => {
  const dialogTitle = React.useMemo(() => {
    switch (props.status) {
      case StudentCreationStatus.STARTED:
      case StudentCreationStatus.PENDING:
        return 'Creating Users';
      case StudentCreationStatus.COMPLETED:
        return 'Completed!';
      case StudentCreationStatus.FAILED:
        return 'Failed!';
      case StudentCreationStatus.ERROR:
        return 'Error!';
    }
  }, [props.status]);

  const dialogBody = React.useMemo(() => {
    switch (props.status) {
      case StudentCreationStatus.STARTED:
        return (
          <>
            <LoadingIndicator />
            <p className="mt-2">Creating student accounts...</p>
          </>
        );
      case StudentCreationStatus.PENDING:
        return (
          <>
            <LoadingIndicator />
            <p className="mt-2">Waiting for results...</p>
          </>
        );
      case StudentCreationStatus.COMPLETED:
        return (
          <div className="w-100">
            <p className="font-weight-bold">Results:</p>
            {props.result && (
              <>
                <p>Successfully Created Users: {props.result.importedUsers}</p>
                <p>Existing/Skipped Users: {props.result.skippedUsers}</p>
                <p>Failed Users: {props.result.failedUsers}</p>
              </>
            )}
          </div>
        );
      case StudentCreationStatus.FAILED:
        return (
          <div className="w-100">
            <p>
              Some students' accounts could not be created. Please check and try
              again.
            </p>
            {props.result && (
              <>
                <p>Successfully Created Users: {props.result.importedUsers}</p>
                <p>Existing/Skipped Users: {props.result.skippedUsers}</p>
                <p>Failed Users: {props.result.failedUsers}</p>
              </>
            )}
          </div>
        );
      case StudentCreationStatus.ERROR:
        return (
          <p>
            An error occurred while trying to create the students' accounts. Please
            check and try again.
          </p>
        );
    }
  }, [props.status, props.result]);

  const isCreationInProgress =
    props.status === StudentCreationStatus.PENDING ||
    props.status === StudentCreationStatus.STARTED;

  return (
    <Modal
      show={props.status !== StudentCreationStatus.NONE}
      onHide={props.onClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton={!isCreationInProgress}>
        <Modal.Title>{dialogTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
        {dialogBody}
      </Modal.Body>

      {!isCreationInProgress && (
        <Modal.Footer>
          <Button variant="primary" onClick={props.onClose}>
            OK
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default CreationDialog;
