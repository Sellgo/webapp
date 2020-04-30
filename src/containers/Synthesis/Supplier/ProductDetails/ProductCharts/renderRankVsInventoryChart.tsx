import React from 'react';
import SplineChart from '../../../../../components/Chart/SplineChart';

export default (productRanks: any, productInventories: any) => {
  const data = [
    {
      yAxis: 0,
      type: 'line',
      name: 'Rank',
      color: '#FD8373',
      data: productRanks,
    },
    {
      yAxis: 1,
      type: 'column',
      name: 'Inventory',
      color: '#4AD991',
      data: productInventories,
    },
  ];
  const chartOptions = {
    title: 'Rank vs Inventory',
    data: data,
  };
  return <SplineChart options={chartOptions} />;
};
