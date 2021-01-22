import React from "react";
import "./MissionItemContainer.scss";

interface Props {}

const MissionItemContainer = (props: React.PropsWithChildren<Props>) => {
  return <div className="mb-4 appcard p-4 missionItemCard">{props.children}</div>;
};

export default MissionItemContainer;
