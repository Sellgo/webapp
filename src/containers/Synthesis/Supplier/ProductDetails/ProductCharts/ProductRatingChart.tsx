import React from 'react';
import StepLineChart from '../../../../../components/Chart/StepLineChart';

export default ({ productRatings, period, xMin, xMax }: any) => {
  const data = [
    {
      type: 'line',
      name: 'Rating',
      color: '#AE8BE7',
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
    yAxis: {
      endOnTick: false,
    },
    period: period,
  };
  return <StepLineChart options={chartOptions} />;
};
