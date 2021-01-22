import React from "react";
import "./missionUITypography.scss";

interface Props {
  options: string[];
}

const MissionQuestionOptions = (props: Props) => {
  return (
    <>
      <p className="m-0 font-weight-bold missionItemLabel">Options</p>
      <ol>
        {props.options.map((opt) => (
          <li className="pl-2">{opt}</li>
        ))}
      </ol>
    </>
  );
};

export default MissionQuestionOptions;
