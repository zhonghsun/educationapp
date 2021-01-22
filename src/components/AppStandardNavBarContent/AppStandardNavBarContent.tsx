import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import {
  faHome,
  faCalendarAlt,
  faMapMarkedAlt,
  faUsers,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router";
import styles from "./AppStandardNavBarContent.module.scss";
import clsx from "clsx";
import LogoSvg from "inlinesvg/LogoSvg";
import AppSideBarLink from "components/AppSideBar/AppSideBarLink";

interface Props {}

/** Contains the general links to other sections of the site */
const AppStandardNavBarContent = (props: Props) => {
  return (
    <Nav className="flex-column align-items-center">
      <LogoSvg className={styles.logo} />
      <div className="align-self-stretch" style={{ borderBottom: "1px solid white" }} />
      <AppSideBarLink to="/" exact label="Home" icon={faHome} />
      <AppSideBarLink to="/challenge" label="Term Challenges" icon={faCalendarAlt} />
      <AppSideBarLink to="/venue" label="Venues" icon={faMapMarkedAlt} />
      <AppSideBarLink to="/users" label="Users" icon={faUsers} />
      <AppSideBarLink to="/settings" label="Settings" icon={faCog} />
      <AppSideBarLink onClick={() => {}} label="Logout" icon={faSignOutAlt} />
    </Nav>
  );
};

export default AppStandardNavBarContent;
