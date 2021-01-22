import React from 'react';

interface Props {
  label?: number | string | JSX.Element | React.ReactNode;
}

const Bullet = (props: Props) => {
  return <div className="mr-2">{props.label}</div>;
};

Bullet.defaultProps = {
  label: '•',
};

export default Bullet;
