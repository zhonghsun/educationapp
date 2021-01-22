import React from "react";
import { LinkContainer } from "react-router-bootstrap";

interface Props {}

const TermsPageActionRow = (props: Props) => {
  return (
    <div className="d-flex my-2">
      <LinkContainer className="clickable primary-button mr-3" key="new_term" to="/challenge/new">
        <p>Create New Term</p>
      </LinkContainer>
      <LinkContainer className="clickable secondary-button" key="upload_term" to="/upload">
        <p>Upload New Term</p>
      </LinkContainer>
    </div>
  );
};

export default TermsPageActionRow;
