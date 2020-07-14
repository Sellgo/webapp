import React from 'react';
import StepLineChart from '../../../../../components/Chart/StepLineChart';

export default ({ productRatings, xMin, xMax }: any) => {
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
  };
  return <StepLineChart options={chartOptions} />;
};
