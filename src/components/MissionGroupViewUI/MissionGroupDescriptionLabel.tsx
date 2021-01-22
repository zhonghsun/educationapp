import React from "react";
import "./MissionGroupViewUI.scss";

interface Props {}

const MissionGroupDescriptionLabel = (props: React.PropsWithChildren<Props>) => {
  return <p className="m-0 font-weight-bold missionGroupDescriptionText">{props.children}</p>;
};

export default MissionGroupDescriptionLabel;
