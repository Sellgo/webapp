import React from 'react';

interface Props {
  width: number;
  height: number;
  fill: string;
}

const User: React.FC<Props> = props => {
  const { width, height, fill } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
      <path d="M0 7.33L2.829 4.5l9.175 9.339L21.171 4.5 24 7.33 12.004 19.5z" fill={fill} />
    </svg>
  );
};

export default User;
