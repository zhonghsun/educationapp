import React from "react";

interface Props {}

const MissionQuestionsList = (props: React.PropsWithChildren<Props>) => {
  return (
    <div className="mt-4 d-flex flex-column">
      <h5 className="m-0 mb-3">Questions</h5>
      {props.children}
    </div>
  );
};

export default MissionQuestionsList;
