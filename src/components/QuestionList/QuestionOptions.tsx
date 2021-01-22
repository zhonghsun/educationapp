import React from 'react';
import QuestionMcqOptions from './QuestionMcqOptions';
import QuestionTextOption from './QuestionTextOption';

interface Props {
  id: string;
  idx: number;
  type: string;
  answer: number | string;
  options: string[];
  onAddOption: () => void;
  onChangeOption: (optionIdx: number, value: string) => void;
  onSetAnswer: (option: number | string) => void;
}

const QuestionOptions = (props: Props) => {
  switch (props.type) {
    case 'mcq': {
      return (
        <QuestionMcqOptions
          baseId={props.id}
          idx={props.idx}
          answerIdx={+props.answer}
          options={props.options}
          onAddOption={props.onAddOption}
          onChangeOption={props.onChangeOption}
          onSetAnswer={props.onSetAnswer}
        />
      );
    }

    case 'text': {
      return (
        <QuestionTextOption
          answer={props.answer.toString()}
          onSetAnswer={props.onSetAnswer}
        />
      );
    }

    default: {
      return <div></div>;
    }
  }
};

export default QuestionOptions;
