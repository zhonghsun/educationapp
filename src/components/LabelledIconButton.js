import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LabelledIconButton = ({ onClick, className, icon, children }) => {
  return (
    <div className={'position-relative ' + className}>
      <FontAwesomeIcon
        onClick={onClick}
        icon={icon}
        className={'hover-selector clickable'}
      />
      <div
        className="show-on-hover"
        style={{
          position: 'absolute',
          left: '50%',
          top: '100%',
          transform: 'translate3d(-50%,0,0)',
          zIndex: 32,
          fontSize: '0.75em',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default LabelledIconButton;
