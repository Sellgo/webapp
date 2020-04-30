import React from 'react';
import PieChart from '../../../../../components/Chart/PieChart';

export default (supplier: any) => {
  const rate = parseFloat(supplier.rate);
  const p2l_ratio = supplier.p2l_ratio - parseFloat(supplier.rate);
  const miss = 100 - supplier.p2l_ratio;
  const data = [
    {
      name: 'Profitable SKUs',
      y: rate,
      sliced: false,
      selected: false,
      color: '#CAE1F3',
    },
    {
      name: 'Hit Non-Profitable SKUs',
      y: p2l_ratio,
      selected: false,
      sliced: false,
      color: '#FBC4C4',
    },
    {
      name: 'Miss',
      y: miss,
      color: '#ECEBEB',
    },
  ];
  const chartOptions = {
    title: 'Hit/Miss vs Profitable SKUs',
    name: 'SKUs',
    data: data,
  };
  return <PieChart options={chartOptions} />;
};
