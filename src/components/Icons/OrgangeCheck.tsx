import React from 'react';

interface Props {
  width: number;
  height: number;
  fill: string;
}

const OrangeCheck: React.FC<Props> = props => {
  const { width, height, fill } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={width}
      viewBox={`0 0 ${width} ${height}`}
    >
      <path
        d="M10 5a5 5 0 11-5-5 5 5 0 015 5zM4.422 7.647l3.71-3.71a.323.323 0 000-.456l-.456-.456a.323.323 
				0 00-.456 0L4.195 6.05 2.783 4.638a.323.323 0 00-.456 0l-.456.456a.323.323 0 000 .456l2.1 
				2.1a.323.323 0 00.456 0z"
        fill={fill}
      />
    </svg>
  );
};

export default OrangeCheck;
