import React from 'react';
import StepLineChart from '../../../../../components/Chart/StepLineChart';

export default ({ productReviews }: any) => {
  const data = [
    {
      type: 'line',
      name: 'Review Count',
      color: '#0E9FE8',
      data: productReviews,
    },
  ];
  const chartOptions = {
    title: 'Review',
    data: data,
  };
  return <StepLineChart options={chartOptions} />;
};
