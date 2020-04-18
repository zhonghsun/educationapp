import React, { useRef, useState } from "react";
import { Form, FormLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewNote.css";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";

export default function NewMission(props) {
  const file = useRef(null);
  const [questions, setquestions] = useState("");
  const [title, settitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return questions.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }
  
    setIsLoading(true);
  
    try {
      const attachment = file.current
        ? await s3Upload(file.current)
        : null;
  
      await createNote({ title, questions, attachment });
      props.history.push("/mission");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function createNote(note) {
    return API.post("mission", "/mission", {
      body: note
    });
  }

  return (
    <div className="NewNote">
      <form onSubmit={handleSubmit}>
        <h3>Title</h3>
        <Form.Group controlId="title">
          <Form.Control
            value={title}
            componentType="text"
            onChange={e => settitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="questions">
        <h3>Mission</h3>
          <Form.Control
            value={questions}
            componentClass="textarea"
            onChange={e => setquestions(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="file">
          <FormLabel>Attachment</FormLabel>
          <Form.Control onChange={handleFileChange} type="file" />
        </Form.Group>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </form>
    </div>
  );
}