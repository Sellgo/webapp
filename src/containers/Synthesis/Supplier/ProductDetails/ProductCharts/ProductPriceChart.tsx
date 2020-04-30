import React from 'react';
import StepLineChart from '../../../../../components/Chart/StepLineChart';

export default ({ productPrices }: any) => {
  const data = [
    {
      type: 'line',
      name: 'Price($)',
      color: '#779ADE',
      data: productPrices,
    },
  ];
  const chartOptions = {
    title: 'Price',
    data: data,
  };
  return <StepLineChart options={chartOptions} />;
};
