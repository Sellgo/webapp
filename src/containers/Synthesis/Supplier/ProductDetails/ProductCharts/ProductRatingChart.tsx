import React from 'react';
import StepLineChart from '../../../../../components/Chart/StepLineChart';
import { MILLISECONDS_IN_A_DAY } from '../../../../../utils/date';

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
        minTickInterval: MILLISECONDS_IN_A_DAY,
      },
    ],
  };
  return <StepLineChart options={chartOptions} />;
};
