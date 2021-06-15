import React from 'react';

interface Props {
  width: number;
  height: number;
  fill: string;
}

const User: React.FC<Props> = props => {
  const { width, height, fill } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <path
        d="M6 6.857a3.429 3.429 0 10-3.429-3.428A3.428 3.428 0 006 6.857zm2.4.857h-.447a4.663 
				4.663 0 01-3.905 0H3.6a3.6 3.6 0 00-3.6 3.6v1.114a1.286 1.286 0 001.286 1.286h9.429A1.286 
				1.286 0 0012 12.429v-1.115a3.6 3.6 0 00-3.6-3.6z"
        fill={fill}
      />
    </svg>
  );
};

export default User;
