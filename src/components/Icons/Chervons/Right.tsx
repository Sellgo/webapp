import React from 'react';

interface Props {
  width: number;
  height: number;
  fill: string;
}

const RightArrow: React.FC<Props> = props => {
  const { width, height, fill } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <path
        d="M9.815 8.839l-7.7 7.763a.63.63 0 01-.892 0L.185 15.564a.63.63 0 
				010-.892l6.216-6.279L.185 2.115a.63.63 0 010-.892L1.225.185a.63.63 0 
				01.892 0l7.7 7.763a.63.63 0 01-.002.891z"
        fill={fill}
      />
    </svg>
  );
};

export default RightArrow;
