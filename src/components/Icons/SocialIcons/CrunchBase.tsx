import React from 'react';

interface Props {
  width: number;
  height: number;
  fill: string;
}

const CrunchBase: React.FC<Props> = props => {
  const { width, height, fill } = props;
  return (
    <svg
      id="Crunchbase_favicon"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
    >
      <path
        id="Path_428"
        data-name="Path 428"
        d="M18,0H2A2.008,2.008,0,0,0,0,2V18a2.008,2.008,0,0,0,2,2H18a2.008,2.008,0,0,0,2-2V2A2.008,2.008,0,0,0,18,0Z"
        fill="#fff"
      />
      <path
        id="Path_429"
        data-name="Path 429"
        // eslint-disable-next-line max-len
        d="M18,0H2A2.008,2.008,0,0,0,0,2V18a2.008,2.008,0,0,0,2,2H18a2.008,2.008,0,0,0,2-2V2A2.008,2.008,0,0,0,18,0ZM5.872,12.054A1.757,1.757,0,0,0,8.2,11.184H9.584a3.075,3.075,0,1,1,0-1.459H8.2a1.757,1.757,0,1,0-2.327,2.328Zm9.453.7a2.942,2.942,0,0,1-.886.528,3.067,3.067,0,0,1-2.823-.319v.319h-1.26V4.476h1.25V7.9a3.111,3.111,0,0,1,1.5-.524h.224a3.057,3.057,0,0,1,1.992,5.381Zm-.186-2.3a1.753,1.753,0,1,1-3.506,0,1.758,1.758,0,0,1,3.506,0Z"
        fill={fill}
      />
    </svg>
  );
};

export default CrunchBase;
