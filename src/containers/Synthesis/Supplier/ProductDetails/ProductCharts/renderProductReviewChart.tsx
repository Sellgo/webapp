import React from 'react';
import StepLineChart from '../../../../../components/Chart/StepLineChart';

export default (productReview: any) => {
  const data = [
    {
      type: 'line',
      name: 'Review Count',
      color: '#0E9FE8',
      data: productReview,
    },
  ];
  const chartOptions = {
    title: 'Review',
    data: data,
  };
  return <StepLineChart options={chartOptions} />;
};
