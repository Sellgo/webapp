/* eslint-disable max-len */
import React from 'react';

interface Props {
  width: number;
  height: number;
  fill: string;
}

const Klout: React.FC<Props> = props => {
  const { width, height, fill } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 15.833">
      <path
        id="klout_1_"
        data-name="klout (1)"
        d="M0,14.994H13.475L20,18.333V2.5H0ZM8.882,4.316H11.16v3.3H12.8l2.215-3.3h2.775l-3.03,4.3,3.283,4.469H15.195l-2.4-3.44H11.157v3.44H8.882Zm-6.672,0H4.99l2.217,3.3H8.19V9.648H7.214l-2.4,3.441H1.958L5.242,8.618Z"
        transform="translate(0 -2.5)"
        fill={fill}
      />
    </svg>
  );
};

export default Klout;
