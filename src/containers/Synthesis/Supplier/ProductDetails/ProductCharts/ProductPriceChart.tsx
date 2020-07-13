import React from 'react';
import StepLineChart from '../../../../../components/Chart/StepLineChart';
import { MILLISECONDS_IN_A_DAY } from '../../../../../utils/date';

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
        minTickInterval: MILLISECONDS_IN_A_DAY,
      },
    ],
  };
  return <StepLineChart options={chartOptions} />;
};
