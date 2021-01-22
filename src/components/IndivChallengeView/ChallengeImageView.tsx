import React from 'react';
import S3Image from 'components/S3Image/S3Image';
import Bullet from 'components/Bullet';

interface Props {
  title: string;
  imgSrc: string;
}

const ChallengeImageView = (props: Props) => {
  if (!props.imgSrc) {
    return (
      <div className="d-flex challenge-tab">
        <Bullet />
        <b>{props.title}:&nbsp;</b>
        <i>No image found.</i>
      </div>
    );
  }
  return (
    <div className="d-flex challenge-tab flex-column">
      <div className="d-flex">
        <Bullet />
        <b>{props.title}</b>
      </div>

      <S3Image src={props.imgSrc} className="challenge-image" />
    </div>
  );
};

export default ChallengeImageView;
