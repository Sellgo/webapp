import React, { memo } from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

const UserMagnifyingIcon: React.FC<Props> = props => {
  const { width, height, fill } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 15}
      height={height ?? 15}
      viewBox="0 0 20 16.007"
    >
      <path
        id="user-magnifying-glass-solid"
        d="M7,8A4,4,0,1,0,3,4,4,4,0,0,0,7,8ZM5.573,9.5A5.572,5.572,0,0,0,0,15.074.928.928,0,0,0,.928,
        16H13.074A.928.928,0,0,0,14,15.074V15a5,5,0,0,1-5-5,4.62,4.62,0,0,1,.022-.469A5.319,5.319,
        0,0,0,8.429,9.5ZM14,7.5A2.5,2.5,0,1,1,11.5,10,2.5,2.5,0,0,1,14,7.5Zm0,6.5a3.989,3.989,0,0,0,
        2.247-.691l2.472,2.472a.749.749,0,1,0,1.06-1.06l-2.472-2.472A4,4,0,1,0,14,14.008Z"
        fill={fill ?? '#fff'}
      />
    </svg>
  );
};

export default memo(UserMagnifyingIcon);
