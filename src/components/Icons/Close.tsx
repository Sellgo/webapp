import React from 'react';

interface Props {
  width: number;
  height: number;
  fill: string;
}

const Close: React.FC<Props> = props => {
  const { width, height, fill } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#prefix__clip0)">
        <path
          d="M23.954 21.03l-9.184-9.095 9.092-9.174L21.03-.046l-9.09 9.179L2.764.045l-2.81 
					2.81L9.14 11.96.045 21.144l2.81 2.81 9.112-9.192 9.18 9.1 2.807-2.832z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0">
          <path fill="none" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Close;
