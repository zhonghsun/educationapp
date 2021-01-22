import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {
  icon: any;
}

const TitleIcon = (props: Props) => {
  return (
    <div className="titleIcon">
      <FontAwesomeIcon icon={props.icon} />
    </div>
  );
};

export default React.memo(TitleIcon);
