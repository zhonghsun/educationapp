import ImagePlaceholder from "components/ImagePlaceholder/ImagePlaceholder";
import S3Image from "components/S3Image/S3Image";
import React from "react";
import "./MissionGroupViewUI.scss";

interface Props {
  imageUrl: string;
}

const MissionGroupImage = (props: Props) => {
  return (
    <div className="missionGroupImage">
      {props.imageUrl ? <S3Image src={props.imageUrl} /> : <ImagePlaceholder />}
    </div>
  );
};

export default MissionGroupImage;
