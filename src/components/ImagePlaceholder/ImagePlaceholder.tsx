import React from 'react'
import classes from './ImagePlaceholder.module.scss';

interface Props {
  
}

const ImagePlaceholder = (props: Props) => {
  return (
    <div className={classes.placeholder}>
      <em>No image found.</em>
    </div>
  )
}

export default ImagePlaceholder
