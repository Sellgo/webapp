import React from 'react';
import SplineChart from '../../../../../components/Chart/SplineChart';

export default ({ productRanks, productInventories }: any) => {
  const data = [
    {
      yAxis: 0,
      type: 'line',
      step: true,
      name: 'Rank',
      color: '#FD8373',
      data: productRanks,
      zIndex: 2,
    },
    {
      yAxis: 1,
      type: 'column',
      name: 'Inventory',
      color: '#4AD991',
      data: productInventories,
      zIndex: 1,
    },
  ];
  const chartOptions = {
    title: 'Rank vs Inventory',
    data: data,
  };
  return <SplineChart options={chartOptions} />;
};
