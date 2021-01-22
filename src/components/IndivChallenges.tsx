import React from "react";
import { Accordion, Form, Card } from "react-bootstrap";
import CollapsiblePanel from "./CollapsiblePanel";
import CollapsiblePanelListItem from "./CollapsiblePanelListItem";
import LabelledIconButton from "./LabelledIconButton/LabelledIconButton";
import AppIcons from "./AppIcons";
import { Challenge } from "models/Challenge";
import QuestionList from "./QuestionList/QuestionList";
import { Question } from "models/Question";
import produce from "immer";
import FileDropInput from "./FileDropInput/FileDropInput";

interface Props {
  asMissions?: boolean;
  challenges: Challenge[];
  onChange: (idx: number, challenge: Partial<Challenge>) => void;
  onDelete: (idx: number) => void;
}

const IndivChallenges = (props: Props) => {
  const addNewChallenge = () => {
    props.onChange(props.challenges.length, new Challenge());
  };

  const handleDeleteChallenge = (idx: number) => {
    props.onDelete(idx);
  };

  const editChallengeTitle = (idx, title: string) => {
    props.onChange(idx, { title });
  };

  const addQuestionToChallenge = (idx: number) => {
    props.onChange(idx, {
      questions: produce(props.challenges[idx].questions, (draft) => {
        draft.push(new Question());
      }),
    });
  };

  const editQuestionOfChallenge = (cIdx: number, qnIdx: number, question: Partial<Question>) => {
    const newChallenge = produce(props.challenges[cIdx], (draft) => {
      if (question === null) {
        draft.questions.splice(qnIdx, 1);
      } else {
        draft.questions[qnIdx] = { ...draft.questions[qnIdx], ...question };
      }
    });
    props.onChange(cIdx, newChallenge);
  };

  const changeChallengeImg = (cIdx: number, uploadImgFile: File) => {
    props.onChange(cIdx, { uploadImgFile });
  };

  return (
    <div className="d-flex flex-column">
      {props.challenges.map((challenge, cIdx) => (
        <Accordion>
          <CollapsiblePanel
            key={cIdx}
            className="appcard mb-4"
            headerRootClass="p-0 my-2"
            headerClass="clickable py-3 px-4"
            eventKey={"challenge-" + cIdx}
            title={
              <CollapsiblePanelListItem
                idx={cIdx}
                placeholder="Untitled"
                title={challenge.title}
                qnsNum={challenge.questions.length}
                decorator={
                  <LabelledIconButton
                    onClick={() => handleDeleteChallenge(cIdx)}
                    icon={AppIcons.delete}
                    className="hoverbtn-delete ml-4"
                  >
                    Delete
                  </LabelledIconButton>
                }
              />
            }
          >
            <Form.Group>
              <Form.Label>{props.asMissions ? "Mission" : "Individual Challenge"} Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={challenge.title}
                onChange={(e) => editChallengeTitle(cIdx, e.target.value)}
              />
            </Form.Group>
            <FileDropInput
              id="challenge-image-upload"
              title={(props.asMissions ? "Mission" : "Challenge") + " Image"}
              onFileInput={(file) => changeChallengeImg(cIdx, file)}
            />
            <div className="d-flex w-100 mb-2">Questions</div>
            <QuestionList
              cIdx={cIdx}
              questions={challenge.questions}
              onChange={(qnIdx, qn) => editQuestionOfChallenge(cIdx, qnIdx, qn)}
              onAddQuestion={() => addQuestionToChallenge(cIdx)}
            />
          </CollapsiblePanel>
        </Accordion>
      ))}
      <Card className="appcard link font-italic text-center text-primary p-4" onClick={addNewChallenge}>
        Click to add new {props.asMissions ? "mission" : "individual challenge"}
      </Card>
    </div>
  );
};

export default IndivChallenges;
