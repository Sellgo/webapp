import React from 'react';

interface Props {
  width: number;
  height: number;
  fill: string;
}

const LeftArrow: React.FC<Props> = props => {
  const { width, height, fill } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <path
        d="M.185 7.948l7.7-7.763a.63.63 0 01.892 0l1.038 1.04a.63.63 0 010 .892L3.599 
				8.396l6.216 6.279a.63.63 0 010 .892l-1.039 1.039a.63.63 0 01-.892 
				0l-7.7-7.763a.63.63 0 01.001-.895z"
        fill={fill}
      />
    </svg>
  );
};

export default LeftArrow;
