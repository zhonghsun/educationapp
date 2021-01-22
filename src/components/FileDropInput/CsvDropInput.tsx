import React from "react";
import { Form } from "react-bootstrap";
import "./FileDropInput.scss";

interface Props {
  id: string;
  title: string;
  onFileInput: (file: File) => void;
}

const CsvDropInput = (props: Props) => {
  const dropRef = React.useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [filename, setFilename] = React.useState<string>(null);

  const getDropRef = (ref: HTMLInputElement) => {
    dropRef.current = ref;
  };

  const handleFileReceive = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    props.onFileInput(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const handleFileDrop = (e) => {
    handleDragRelease();
  };

  const handleDragOver = () => {
    if (!isDragOver) {
      setIsDragOver(() => true);
    }
  };

  const handleDragRelease = () => {
    if (isDragOver) {
      setIsDragOver(() => false);
    }
  };

  const handleClearFile = () => {
    if (dropRef.current) {
      dropRef.current.value = "";
    }

    setFilename(null);
  };

  const filedropLabel = filename || "Choose a .csv file or drag it here.";

  return (
    <Form.Group>
      <Form.Label>{props.title}</Form.Label>
      <div className="d-flex flex-column">
        <Form.File
          ref={getDropRef as any}
          custom
          label={filedropLabel}
          className={isDragOver && "filedropinput-dragover"}
          id={props.id}
          accept=".csv"
          onChange={handleFileReceive}
          onDragEnter={handleDragOver}
          onDragOver={handleDragOver}
          onDrop={handleFileDrop}
          onDragLeave={handleDragRelease}
          onDragEnd={handleDragRelease}
        />
      </div>
    </Form.Group>
  );
};

export default React.memo(CsvDropInput);
