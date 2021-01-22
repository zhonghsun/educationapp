import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import LabelledIconButton from '../LabelledIconButton/LabelledIconButton';
import AppIcons from '../AppIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  baseId: string;
  idx: number;
  answerIdx: number;
  options: string[];
  onAddOption: () => void;
  onChangeOption: (optionIdx: number, value: string) => void;
  onSetAnswer: (optionIdx: number) => void;
}

const QuestionMcqOptions = (props: Props) => {
  return (
    <Form.Group as={Row}>
      <Form.Label column md="3" sm="4" className="mb-0 px-3">
        MCQ Options:
      </Form.Label>
      <Col className="pr-3">
        <QuestionMcqOptionTitleRow />
        {props.options.map((opt, optIdx) => (
          <QuestionMcqOption
            key={optIdx}
            baseId={props.baseId}
            idx={optIdx}
            isAnswer={optIdx === props.answerIdx}
            value={opt}
            onChange={(value) => props.onChangeOption(optIdx, value)}
            onDelete={() => props.onChangeOption(optIdx, null)}
            onSetAnswer={() => props.onSetAnswer(optIdx)}
          />
        ))}
        <Button
          onClick={props.onAddOption}
          variant="outline-primary"
          className="mt-2"
        >
          <FontAwesomeIcon icon={AppIcons.add} className="mr-2" />
          Add Option
        </Button>
      </Col>
    </Form.Group>
  );
};

const QuestionMcqOptionTitleRow = () => {
  return (
    <div className="d-flex align-items-center">
      <div className="flex-grow-1 pr-2">Options</div>
      <div style={{ minWidth: 64 }}>Answer?</div>
      <div style={{ minWidth: 32 }} />
    </div>
  );
};

interface OptionProps {
  baseId: string;
  idx: number;
  isAnswer: boolean;
  value: string;
  onChange: (value: string) => void;
  onDelete: () => void;
  onSetAnswer: () => void;
}

const QuestionMcqOption = (props: OptionProps) => {
  return (
    <div className="d-flex align-items-center">
      <div className="pr-2">{props.idx + 1}.</div>
      <Form.Control
        type="text"
        className="my-1"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
      <Form.Check
        style={{ minWidth: 64, textAlign: 'center' }}
        type="checkbox"
        custom
        checked={props.isAnswer}
        onClick={props.onSetAnswer}
        id={'custom-mcq-option-' + props.baseId + '-' + props.idx}
        label=""
      />
      <LabelledIconButton
        icon={AppIcons.delete}
        className="hoverbtn-delete p-2"
        onClick={props.onDelete}
      />
    </div>
  );
};

export default QuestionMcqOptions;
