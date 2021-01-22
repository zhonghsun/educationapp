import { TermChallenge } from "models/TermChallenge";
import React from "react";
import MissionGroupDescriptionContainer from "components/MissionGroupViewUI/MissionGroupDescriptionContainer";
import Label from "components/MissionGroupViewUI/MissionGroupDescriptionLabel";
import Value from "components/MissionGroupViewUI/MissionGroupDescriptionValue";
import { format } from "date-fns";

interface Props {
  term: TermChallenge;
}

const TermDescriptionBox = (props: Props) => {
  return (
    <MissionGroupDescriptionContainer imageUrl={props.term.imageUrl}>
      <Label>Title</Label>
      <Value>{props.term.title}</Value>

      <Label>Topics</Label>
      <Value>
        {props.term.topics && props.term.topics.length ? (
          props.term.topics.join(", ")
        ) : (
          <i>No topics found. for this venue.</i>
        )}
      </Value>

      <Label>Last Modified Date</Label>
      <Value>{format(props.term.date, "d MMM yyyy")}</Value>
    </MissionGroupDescriptionContainer>
  );
};

export default TermDescriptionBox;
