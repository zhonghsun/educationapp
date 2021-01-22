import clsx from "clsx";
import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"h1"> {}

const PageTitle = (props: React.PropsWithChildren<Props>) => {
  return (
    <h1 {...props} className={clsx("my-4 font-weight-bold", props.className)}>
      {props.children}
    </h1>
  );
};

export default PageTitle;
