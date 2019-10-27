import React, { useRef, useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewChallenge.css";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";

export default function NewMission(props) {
  const file = useRef(null);
  const [challenge, setchallenge] = useState("");
  const [title, settitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return challenge.length > 0;
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
  
      await createNote({ title, challenge, attachment });
      props.history.push("/challenge");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function createNote(note) {
    return API.post("challenge", "/challenge", {
      body: note
    });
  }

  return (
    <div className="NewNote">
      <form onSubmit={handleSubmit}>
        <h3>Title</h3>
        <FormGroup controlId="title">
          <FormControl
            value={title}
            componentType="text"
            onChange={e => settitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="challenge">
        <h3>Mission</h3>
          <FormControl
            value={challenge}
            componentClass="textarea"
            onChange={e => setchallenge(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="file">
          <ControlLabel>Attachment</ControlLabel>
          <FormControl onChange={handleFileChange} type="file" />
        </FormGroup>
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