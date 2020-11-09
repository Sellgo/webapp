import no_cost_icon from '../../assets/images/no-cost.svg';
import React from 'react';
import './index.scss';

export const WithoutCostUpload = () => {
  return <img src={no_cost_icon} alt={'icon'} style={{ float: 'right', marginLeft: 3 }} />;
};
