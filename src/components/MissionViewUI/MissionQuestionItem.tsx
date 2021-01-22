import { Question } from "models/Question";
import React from "react";
import MissionQuestionOptions from "./MissionQuestionOptions";
import "./missionUITypography.scss";

interface Props {
  question: Question;
  questionIndex: number;
}

const MissionQuestionItem = (props: Props) => {
  return (
    <div className="p-3 mb-4" style={{ borderRadius: 12, boxShadow: "0 0 3px 1px rgba(0,0,0,0.1)" }}>
      <h6 className="font-weight-bold">
        {props.questionIndex + 1}. &nbsp;&nbsp;&nbsp;{props.question.question}
      </h6>

      {props.question.options && <MissionQuestionOptions options={props.question.options} />}

      <p className="m-0 font-weight-bold missionItemLabel">Answer</p>
      <h6 className="mb-3">
        {props.question.type === "mcq"
          ? `${+props.question.answer + 1}. ${props.question.options[props.question.answer]}`
          : props.question.answer}
      </h6>
      <p className="m-0 font-weight-bold missionItemLabel">Hints</p>
      <h6>{props.question.hints}</h6>
    </div>
  );
};

export default MissionQuestionItem;
