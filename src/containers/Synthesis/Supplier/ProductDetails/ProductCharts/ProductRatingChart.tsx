import React from 'react';
import StepLineChart from '../../../../../components/Chart/StepLineChart';

export default ({ productRatings, period, xMin, xMax }: any) => {
  const data = [
    {
      type: 'line',
      name: 'Rating',
      color: '#F3A9CA',
      data: productRatings,
      tooltip: {
        valueDecimals: 1,
      },
    },
  ];
  const chartOptions = {
    title: 'Rating',
    data: data,
    xAxis: [
      {
        min: xMin,
        max: xMax,
      },
    ],
    period: period,
  };
  return <StepLineChart options={chartOptions} />;
};
