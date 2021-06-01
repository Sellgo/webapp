import React from 'react';

interface Props {
  width: number;
  height: number;
  fill: string;
}

const TwitterLogo: React.FC<Props> = props => {
  const { width, height, fill } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#prefix__clip0)">
        <path
          d="M40 7.595a16.384 16.384 0 01-4.713 1.292 8.22 8.22 0 003.608-4.54 
					16.44 16.44 0 01-5.212 1.991 8.193 8.193 0 00-5.99-2.591c-5.298 0-9.191
					 4.943-7.995 10.075-6.818-.342-12.865-3.609-16.913-8.574-2.15 3.689-1.115 
					 8.514 2.538 10.957a8.173 8.173 0 01-3.715-1.027c-.09 3.802 2.635 7.359 6.582 
					 8.15a8.225 8.225 0 01-3.707.14 8.212 8.212 0 007.667 5.699A16.5 16.5 0 010 
					 32.567a23.231 23.231 0 0012.58 3.686c15.237 0 23.845-12.868 23.325-24.41A16.708 
					 16.708 0 0040 7.595z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0">
          <path fill={fill} d="M0 0h40v40H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default TwitterLogo;
