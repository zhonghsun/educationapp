import React from 'react';
import { Challenge } from 'models/Challenge';
import { format } from 'date-fns';
import Bullet from 'components/Bullet';
import ChallengeImageView from './ChallengeImageView';
import './IndivChallengeView.scss';

interface Props {
  asMissions?: boolean;
  idx: number;
  challenge: Challenge;
}

const IndivChallengeView = (props: Props) => {
  const itemStr = props.asMissions ? 'mission' : 'challenge';

  if (!props.challenge) {
    return (
      <div className="d-flex flex-column border pb-2">
        <div className="p-1 bg-light font-weight-bold text-primary">
          <span className="mr-3">{props.idx}.</span>
          Invalid {itemStr}. Please delete this and save.
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column border pb-2">
      <div className="p-1 bg-light font-weight-bold text-primary">
        <span className="mr-3">{props.idx}.</span>
        {props.challenge.title}
      </div>
      <div className="d-flex challenge-tab">
        <Bullet />
        <b>Last modified:&nbsp;</b>
        {format(props.challenge.date, 'dd MMM yyyy')}
      </div>
      <ChallengeImageView
        title={props.asMissions ? 'Mission Image' : 'Challenge Image'}
        imgSrc={props.challenge.imageUrl}
      />
      <div className="d-flex flex-column challenge-tab">
        <div className="d-flex">
          <Bullet />
          <b>Questions: </b>
        </div>
        {props.challenge.questions.map((qn, idx) => (
          <div className="d-flex flex-column challenge-tab subcontent hovercard">
            <div className="d-flex text-info font-weight-bold">
              <Bullet label={idx + 1 + '.'} />
              {qn.question}
            </div>
            <div className="challenge-tab">
              <b>Answer: </b>
              {qn.type === 'mcq' ? qn.options[qn.answer] : qn.answer}
            </div>
            {Boolean(qn.hints) && (
              <div className="challenge-tab">
                <b>Hints: </b>
                {qn.hints}
              </div>
            )}
            {Boolean(qn.options && qn.options.length) && (
              <div className="challenge-tab">
                <b>Options: </b>
                <div className="d-flex flex-column challenge-tab">
                  {qn.options.map((o, idx) => (
                    <div className="d-flex">
                      <Bullet label={idx + 1 + '.'} />
                      {o}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndivChallengeView;
