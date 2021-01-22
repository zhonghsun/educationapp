import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React from "react";
import { Badge } from "react-bootstrap";
import styles from "./IconButton.module.scss";

interface Props {
  icon: IconProp;
  onClick?: (event?: React.MouseEvent) => void;
  className?: string;
}

const IconButton = (props: Props) => {
  return (
    <Badge
      onClick={props.onClick}
      className={clsx(styles.iconButtonBase, props.className)}
      pill
      variant="primary"
    >
      <FontAwesomeIcon icon={props.icon} />
    </Badge>
  );
};

export default IconButton;
