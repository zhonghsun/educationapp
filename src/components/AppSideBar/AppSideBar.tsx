import React from "react";
import styles from "./AppSideBar.module.scss";

interface Props {}

const AppSideBar = (props: React.PropsWithChildren<Props>) => {
  return <div className={styles.sidebar}>{props.children}</div>;
};

export default AppSideBar;
