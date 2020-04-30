import React from 'react';
import StepLineChart from '../../../../../components/Chart/StepLineChart';

export default ({ productRatings }: any) => {
  const data = [
    {
      type: 'line',
      name: 'Rating',
      color: '#F3A9CA',
      data: productRatings,
    },
  ];
  const chartOptions = {
    title: 'Rating',
    data: data,
  };
  return <StepLineChart options={chartOptions} />;
};
