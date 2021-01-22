import React from 'react';
import { s3ImgBaseUrl } from 'libs/awsLib';
import clsx from 'clsx';
import './S3Image.scss';

interface Props {
  src: string;
  className?: string;
}

const S3Image = (props: Props) => {
  return (
    <img
      src={s3ImgBaseUrl + props.src}
      className={clsx('s3-image-base', props.className)}
    />
  );
};

export default S3Image;
