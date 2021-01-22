import React from "react";
import "./MissionGroupViewUI.scss";

interface Props {}

const MissionGroupDescriptionValue = (props: React.PropsWithChildren<Props>) => {
  return <h6 className="mb-4 missionGroupDescriptionValueText">{props.children}</h6>;
};

export default MissionGroupDescriptionValue;
