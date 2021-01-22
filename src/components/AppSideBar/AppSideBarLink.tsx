import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React from "react";
import { Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import styles from "./AppSideBarLink.module.scss";

interface Props {
  to?: string;
  onClick?: () => void;
  label: string;
  icon: IconProp;
  exact?: boolean;
}

const AppSideBarLink = (props: Props) => {
  const location = useLocation();

  if (props.to) {
    // Only wrap with link container if a href is provided.

    const doesPathMatch = props.exact
      ? location.pathname === props.to
      : location.pathname.startsWith(props.to);

    return (
      <LinkContainer to={props.to}>
        <Nav.Link
          onClick={props.onClick}
          className={clsx(styles.linkItem, doesPathMatch && styles.activeLink)}
        >
          <FontAwesomeIcon icon={props.icon} className="mb-2" />
          {props.label}
        </Nav.Link>
      </LinkContainer>
    );
  } else {
    return (
      <Nav.Link onClick={props.onClick} className={clsx(styles.linkItem)}>
        <FontAwesomeIcon icon={props.icon} className="mb-2" />
        {props.label}
      </Nav.Link>
    );
  }
};

export default AppSideBarLink;
