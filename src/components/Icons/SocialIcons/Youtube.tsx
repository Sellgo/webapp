import React from 'react';

interface Props {
  width: number;
  height: number;
  fill: string;
}

const Youtube: React.FC<Props> = props => {
  const { width, height, fill } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32.692.41c-6.007-.547-19.385-.545-25.384 0C.813 1 .048 6.23 0 20c.048 13.744.807 18.998 
				7.308 19.59 6 .545 19.377.547 25.384 0C39.187 39 39.952 33.77 40 20 39.952 6.256 39.193 1.002 
				32.692.41zM15 28.888V11.11l13.333 8.873L15 28.89z"
        fill={fill}
      />
    </svg>
  );
};

export default Youtube;
