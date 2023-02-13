import React, { memo } from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

const AddUserIcon: React.FC<Props> = props => {
  const { width, height, fill } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 15}
      height={height ?? 15}
      viewBox="0 0 20 16"
    >
      <path
        id="user-plus-solid_1_"
        data-name="user-plus-solid (1)"
        d="M11,4A4,4,0,1,1,7,0,4,4,0,0,1,11,4ZM0,15.072A5.571,5.571,0,0,1,5.572,9.5H8.428A5.571,5.571,0,0,1,
        14,15.072a.928.928,0,0,1-.928.928H.928A.928.928,0,0,1,0,15.072ZM15.75,9.75v-2h-2a.75.75,0,0,1,
        0-1.5h2v-2a.75.75,0,0,1,1.5,0v2h2a.75.75,0,0,1,0,1.5h-2v2a.75.75,0,0,1-1.5,0Z"
        fill={fill ?? 'url(#linear-gradient)'}
      />
    </svg>
  );
};

export default memo(AddUserIcon);
