import React from "react";
import clsx from "clsx";

interface Props {
  className?: string;
}

const LoadingIndicator = (props: Props) => {
  return <div className={clsx("spinner-border text-primary", props.className)} />;
};

export default LoadingIndicator;
