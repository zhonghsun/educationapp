import React from 'react';

const CollapsiblePanelListItem = ({
  idx = 0,
  placeholder = 'Untitled Mission',
  title,
  qnsNum = 0,
  decorator,
}) => {
  return (
    <div className="d-flex align-items-center font-weight-bold">
      <div className="mr-2">{idx + 1}.</div>
      <div className={'flex-fill' + (title ? '' : ' font-italic')}>
        {title || placeholder}
      </div>
      <div>Questions: {qnsNum}</div>
      {decorator}
    </div>
  );
};

export default CollapsiblePanelListItem;
