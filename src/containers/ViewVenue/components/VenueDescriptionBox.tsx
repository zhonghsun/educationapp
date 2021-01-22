import MissionGroupDescriptionContainer from "components/MissionGroupViewUI/MissionGroupDescriptionContainer";
import Label from "components/MissionGroupViewUI/MissionGroupDescriptionLabel";
import Value from "components/MissionGroupViewUI/MissionGroupDescriptionValue";
import { format } from "date-fns";
import { Venue } from "models/Venue";
import React from "react";

interface Props {
  venue: Venue;
}

const VenueDescriptionBox = (props: Props) => {
  return (
    <MissionGroupDescriptionContainer imageUrl={props.venue.imageUrl}>
      <Label>Title</Label>
      <Value>{props.venue.title}</Value>

      <Label>Topics</Label>
      <Value>
        {props.venue.topics && props.venue.topics.length ? (
          props.venue.topics.join(", ")
        ) : (
          <i>No topics found. for this venue.</i>
        )}
      </Value>

      <Label>Last Modified Date</Label>
      <Value>{format(props.venue.date, "d MMM yyyy")}</Value>

      <Label>Venue Instructions</Label>
      <Value>{props.venue.instructions}</Value>

      <Label>Venue Background</Label>
      <Value>{props.venue.background}</Value>
    </MissionGroupDescriptionContainer>
  );
};

export default VenueDescriptionBox;
