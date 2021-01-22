import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./LabelledIconButton.scss";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import clsx from "clsx";

interface Props {
  onClick?: () => void;
  className?: string;
  icon: IconDefinition;
  label?: string;
}

const LabelledIconButton = (props: React.PropsWithChildren<Props>) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!props.onClick) return;
    e.preventDefault();
    e.stopPropagation();
    props.onClick();
  };

  return (
    <div className={clsx("position-relative", props.className)}>
      <div onClick={handleClick} className="py-1 px-2 hover-selector clickable">
        <FontAwesomeIcon icon={props.icon} />
      </div>
    </div>
  );
};

export default LabelledIconButton;
