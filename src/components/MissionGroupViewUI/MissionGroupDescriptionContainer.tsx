import React from "react";
import MissionGroupImage from "./MissionGroupImage";
import "./MissionGroupViewUI.scss";

interface Props {
  imageUrl: string;
}

const MissionGroupDescriptionContainer = (props: React.PropsWithChildren<Props>) => {
  return (
    <div className="my-4 appcard p-4 d-flex missionGroupContainer">
      <MissionGroupImage imageUrl={props.imageUrl} />
      <div className="ml-4 flex-fill">{props.children}</div>
    </div>
  );
};

export default MissionGroupDescriptionContainer;
