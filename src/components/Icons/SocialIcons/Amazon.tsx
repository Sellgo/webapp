/* eslint-disable max-len */
import React from 'react';

interface Props {
  width: number;
  height: number;
  fill: string;
}

const Amazon: React.FC<Props> = props => {
  const { width, height, fill } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20.648">
      <path
        id="amazon"
        d="M18.559,38.024c-2.245.083-7.812.714-7.812,5.415,0,5.047,6.374,5.254,8.457,1.991a21.255,21.255,0,0,0,2.088,2.157l2.618-2.581s-1.489-1.166-1.489-2.434v-6.78c0-1.166-1.129-3.793-5.176-3.793s-6.208,2.535-6.208,4.807l3.388.313a2.871,2.871,0,0,1,2.5-2.281c1.876,0,1.636,1.373,1.636,3.185Zm0,4c0,3.687-3.881,3.134-3.881.793,0-2.175,2.328-2.613,3.881-2.664Zm6.268,7.536a11.194,11.194,0,0,1-8.043,3.088c-4.816,0-8.5-3.3-9.633-4.655-.313-.355.046-.521.253-.383,3.378,2.051,8.656,5.429,17.168,1.4C24.919,48.836,25.187,49.1,24.827,49.56Zm1.834.1a3.841,3.841,0,0,1-.977,1.429c-.253.207-.438.124-.3-.175s.89-2.143.585-2.535-1.705-.2-2.212-.147-.6.092-.645-.014c-.106-.263,1-.714,1.728-.807s1.89-.037,2.12.263A3.375,3.375,0,0,1,26.662,49.661Z"
        transform="translate(-7.029 -32)"
        fill={fill}
      />
    </svg>
  );
};

export default Amazon;
