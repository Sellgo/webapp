import React from 'react';
import StepLineChart from '../../../../../components/Chart/StepLineChart';

export default ({ productPrices, xMin, xMax }: any) => {
  const data = [
    {
      type: 'line',
      name: 'Price($)',
      color: '#779ADE',
      data: productPrices,
      tooltip: {
        valueDecimals: 2,
      },
    },
  ];
  const chartOptions = {
    title: 'Price',
    data: data,
    xAxis: [
      {
        min: xMin,
        max: xMax,
      },
    ],
  };
  return <StepLineChart options={chartOptions} />;
};
