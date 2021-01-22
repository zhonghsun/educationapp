import React from "react";
import ImagePlaceholder from "components/ImagePlaceholder/ImagePlaceholder";
import S3Image from "components/S3Image/S3Image";
import { format } from "date-fns";
import "./missionUITypography.scss";

interface Props {
  imageUrl: string;
  title: string;
  date: Date;
}

const MissionItemHeader = (props: Props) => {
  return (
    <div className="d-flex">
      <div style={{ width: 128, height: 128 }}>
        {props.imageUrl ? <S3Image src={props.imageUrl} /> : <ImagePlaceholder />}
      </div>
      <div className="ml-4 flex-fill">
        <p className="m-0 font-weight-bold missionItemLabel">Title</p>
        <h6 className="mb-4">{props.title}</h6>
        <p className="m-0 font-weight-bold missionItemLabel">Last Modified Date</p>
        <h6 className="mb-4">{format(props.date, "d MMM yyyy")}</h6>
      </div>
    </div>
  );
};

export default MissionItemHeader;
