import React from 'react';

interface Props {
  width: number;
  height: number;
  fill: string;
}

const Gem: React.FC<Props> = props => {
  const { width, height, fill } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <path
        d="M8.429 0L10 2.778H8.245L7.043 0zM6.207 0l1.2 2.778H2.592L3.793 0zM1.571 0h1.386l-1.2 
				2.778H0zM0 3.333h1.748L3.884 7.7a.053.053 0 01-.084.06zm2.573 0h4.854L5.049 8.858a.052.052 
				0 01-.1 0zM6.116 7.7l2.135-4.37H10L6.2 7.759a.052.052 0 01-.084-.059z"
        fill={fill}
      />
    </svg>
  );
};

export default Gem;
