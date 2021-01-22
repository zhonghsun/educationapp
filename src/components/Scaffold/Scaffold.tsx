import React from "react";
import styles from "./Scaffold.module.scss";

interface Props {}

const Scaffold = (props: React.PropsWithChildren<Props>) => {
  return (
    <div className={styles.sidebarMargin}>
      <div className="container d-flex flex-column py-4">{props.children}</div>
    </div>
  );
};

export default Scaffold;
