import React from 'react';
import { Form } from 'react-bootstrap';
import './FileDropInput.scss';
import LabelledIconButton from '../LabelledIconButton/LabelledIconButton';
import AppIcons from '../AppIcons';

interface Props {
  id: string;
  title?: string;
  className?: string;
  onFileInput: (imgFile: File) => void;
}

const FileDropInput = (props: Props) => {
  const dropRef = React.useRef<HTMLInputElement>(null);
  const [loadedImg, setLoadedImg] = React.useState<string>(null);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [filename, setFilename] = React.useState<string>(null);

  const getDropRef = (ref: HTMLInputElement) => {
    dropRef.current = ref;
  };

  const handleFileReceive = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    props.onFileInput(e.target.files[0]);
    const imgSrc = URL.createObjectURL(e.target.files[0]);
    setLoadedImg(imgSrc);
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

  const handleClearImg = () => {
    if (dropRef.current) {
      dropRef.current.value = '';
    }

    setFilename(null);
    setLoadedImg(null);
  };

  const filedropLabel = filename || 'Choose a file or drag it here.';

  return (
    <Form.Group className={props.className}>
      {props.title && <Form.Label>{props.title}</Form.Label>}
      <div className="d-flex flex-column">
        <ImagePreview src={loadedImg} onClear={handleClearImg} />
        <Form.File
          ref={getDropRef as any}
          custom
          label={filedropLabel}
          className={isDragOver && 'filedropinput-dragover'}
          id={props.id}
          accept="image/*"
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

interface PreviewProps {
  src: string;
  onClear: () => void;
}

const ImagePreview = (props: PreviewProps) => {
  if (!props.src) return null;

  return (
    <div className="position-relative">
      <img src={props.src} className="filedropinput-preview" />
      <div className="filedrop-input-clearbtn hoverbtn-delete">
        <LabelledIconButton
          icon={AppIcons.close}
          onClick={props.onClear}
          label="Clear"
        />
      </div>
    </div>
  );
};

export default React.memo(FileDropInput);
