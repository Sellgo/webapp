import React from 'react';

interface Props {
  width: number;
  height: number;
  fill: string;
}

const Facebook: React.FC<Props> = props => {
  const { width, height, fill } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#prefix__clip0)">
        <path
          d="M37.792 0H2.208C.988 0 0 .988 0 2.208v35.585C0 39.012.988 40 
					2.208 40h19.159V24.51h-5.214v-6.037h5.214v-4.451c0-5.167 3.155-7.98 7.765-7.98 2.208 0
					 4.105.165 4.658.238v5.4l-3.197.002c-2.506 0-2.991 1.191-2.991 2.938v3.855h5.978l-.778 
					 6.037h-5.2V40h10.193A2.207 2.207 0 0040 37.792V2.208C40 .988 39.012 0 37.792 0z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0">
          <path fill="none" d="M0 0h40v40H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Facebook;
