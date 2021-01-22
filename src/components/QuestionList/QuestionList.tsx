import React from 'react';
import { Question } from '../../models/Question';
import { Accordion, Form, ListGroup, Card, Row } from 'react-bootstrap';
import CollapsiblePanel from '../CollapsiblePanel';
import CollapsiblePanelListItem from '../CollapsiblePanelListItem';
import LabelledIconButton from '../LabelledIconButton/LabelledIconButton';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import QuestionListHeader from './QuestionListHeader';
import './QuestionList.scss';
import QuestionTypeSelection from './QuestionTypeSelection';
import QuestionTitleInput from './QuestionTitleInput';
import QuestionOptions from './QuestionOptions';
import produce from 'immer';
import QuestionHintInput from './QuestionHintInput';

interface Props {
  cIdx: number;
  questions: Question[];
  onChange: (qnIdx: number, question: Partial<Question>) => void;
  onAddQuestion: () => void;
}

const QuestionList = (props: Props) => {
  const deleteQnBuilder = (idx: number) => () => {
    props.onChange(idx, null);
  };

  const changeQnTypeBuilder = (idx: number) => (qnType: string) => {
    props.onChange(idx, { type: qnType, answer: '' });
  };

  const changeQnTextBuilder = (idx: number) => (question: string) => {
    props.onChange(idx, { question });
  };

  const changeQnHintsBuilder = (idx: number) => (hints: string) => {
    props.onChange(idx, { hints });
  };

  const addOptionBuilder = (idx: number) => () => {
    const options = produce(props.questions[idx].options, (draft) => {
      draft.push('');
    });
    props.onChange(idx, { options });
  };

  const changeOptionBuilder = (idx: number) => (optIdx: number, value: string) => {
    const options = produce(props.questions[idx].options, (draft) => {
      if (value === null) {
        draft.splice(optIdx, 1);
      } else {
        draft[optIdx] = value;
      }
    });
    props.onChange(idx, { options });
  };

  const setAnswerBuilder = (idx: number) => (optIdx: number) => {
    props.onChange(idx, { answer: optIdx });
  };

  const getAnswerString = React.useCallback((qn: Question) => {
    if (qn.type === 'mcq') {
      return qn.options[+qn.answer];
    } else if (qn.type === 'text') {
      return qn.answer.toString();
    } else {
      return '';
    }
  }, []);

  return (
    <Accordion defaultActiveKey="1" className="text-left">
      {props.questions.map((qn, idx) => (
        <CollapsiblePanel
          key={idx}
          headerRootClass="qnlist-header px-4 py-1"
          headerClass="clickable"
          eventKey={idx}
          title={
            <QuestionListHeader
              idx={idx}
              title={qn.question}
              answer={getAnswerString(qn)}
              onDelete={deleteQnBuilder(idx)}
            />
          }
        >
          <QuestionTitleInput
            value={qn.question}
            onChange={changeQnTextBuilder(idx)}
          />
          <QuestionTypeSelection
            id={`c-${props.cIdx}-qn-${idx}`}
            idx={idx}
            qnType={qn.type}
            onChange={changeQnTypeBuilder(idx)}
          />
          <QuestionHintInput value={qn.hints} onChange={changeQnHintsBuilder(idx)} />
          <QuestionOptions
            id={`${props.cIdx}-qn-${idx}`}
            idx={idx}
            type={qn.type}
            answer={qn.answer}
            options={qn.options}
            onAddOption={addOptionBuilder(idx)}
            onChangeOption={changeOptionBuilder(idx)}
            onSetAnswer={setAnswerBuilder(idx)}
          />
        </CollapsiblePanel>
      ))}
      <Card className="link font-italic text-center" onClick={props.onAddQuestion}>
        <Card.Header className="qnlist-header text-primary">
          Click to add a new question
        </Card.Header>
      </Card>
    </Accordion>
  );
};

export default QuestionList;
