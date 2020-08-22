import React from 'react';
import StepLineChart from '../../../../../components/Chart/StepLineChart';

export default ({ productReviews, period, xMin, xMax }: any) => {
  const data = [
    {
      type: 'line',
      name: 'Review Count',
      color: '#0E9FE8',
      data: productReviews,
      tooltip: {
        valueDecimals: 0,
      },
    },
  ];
  const chartOptions = {
    title: 'Review',
    data: data,
    xAxis: [
      {
        min: xMin,
        max: xMax,
      },
    ],
    yAxis: {
      endOnTick: false,
    },
    period: period,
  };
  return <StepLineChart options={chartOptions} />;
};
