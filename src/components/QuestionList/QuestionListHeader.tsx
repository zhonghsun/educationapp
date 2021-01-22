import React from 'react';
import LabelledIconButton from '../LabelledIconButton/LabelledIconButton';
import AppIcons from '../AppIcons';

interface Props {
  idx: number;
  title: string;
  answer: string;
  onDelete: () => void;
}

const QuestionListHeader = (props: Props) => {
  return (
    <div className="d-flex align-items-center font-weight-bold">
      <div className="mr-4">Qn. {props.idx + 1}</div>
      <div className="flex-fill">{props.title}</div>
      {props.answer && <div>Answer: {props.answer}</div>}
      <div className="d-flex ml-4">
        <LabelledIconButton
          onClick={props.onDelete}
          className="hoverbtn-delete py-2 px-3"
          icon={AppIcons.delete}
        />
      </div>
    </div>
  );
};

QuestionListHeader.defaultProps = {
  title: 'New Question',
};

export default QuestionListHeader;
