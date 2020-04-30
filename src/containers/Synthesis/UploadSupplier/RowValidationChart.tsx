import React from 'react';
import Chart from '../../../components/Chart/Chart';

export default ({ percentValid, percentError }: any) => {
  const data = [
    {
      name: 'Processed',
      y: percentValid,
      color: '#4ad991',
    },
    {
      name: 'Errors',
      y: percentError,
      color: '#fd8373',
    },
  ];

  const chartOptions = {
    series: [
      {
        type: 'pie',
        colorByPoint: true,
        data: data,
        borderWidth: 0.5,
        size: '145px',
        dataLabels: { enabled: false },
      },
    ],
    chart: {
      type: 'pie',
      width: 200,
      height: 200,
    },
    title: null,
    tooltip: {
      pointFormat: '<b>{point.percentage:.1f}%</b>',
    },
  };
  return <Chart chartOptions={chartOptions} />;
};
