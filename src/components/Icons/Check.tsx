import React from 'react';

interface Props {
  width: number;
  height: number;
  fill: string;
}

const Check: React.FC<Props> = props => {
  const { width, height, fill } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <path
        d="M8.933.076L3.18 5.829 1.066 3.715a.262.262 0 00-.371 0l-.619.619a.262.262 0 000 
				.371l2.918 2.918a.262.262 0 00.371 0l6.557-6.557a.262.262 0 000-.371L9.303.076a.262.262 
				0 00-.37 0z"
        fill={fill}
      />
    </svg>
  );
};

export default Check;
