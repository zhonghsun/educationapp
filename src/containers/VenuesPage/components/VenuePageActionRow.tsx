import React from "react";
import { LinkContainer } from "react-router-bootstrap";

interface Props {}

const VenuePageActionRow = (props: Props) => {
  return (
    <div className="d-flex my-2">
      <LinkContainer className="clickable primary-button mr-3" key="new_venue" to="/venue/new">
        <p>Create New Venue</p>
      </LinkContainer>
      <LinkContainer className="clickable secondary-button" key="upload_venue" to="/upload">
        <p>Upload New Venue</p>
      </LinkContainer>
    </div>
  );
};

export default VenuePageActionRow;
