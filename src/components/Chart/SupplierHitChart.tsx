import React from 'react';
import Chart from './Chart';

export default ({ supplier }: any) => {
  const rate = parseFloat(supplier.rate);
  const p2l_ratio = supplier.p2l_ratio - parseFloat(supplier.rate);
  const miss = 100 - supplier.p2l_ratio;
  const data = [
    {
      name: 'Profitable SKUs',
      y: rate,
      color: '#CAE1F3',
    },
    {
      name: 'Hit Non-Profitable SKUs',
      y: p2l_ratio,
      color: '#FBC4C4',
    },
    {
      name: 'Miss',
      y: miss,
      color: '#ECEBEB',
    },
  ];
  const chartOptions = {
    series: [
      {
        type: 'pie',
        name: 'SKUs',
        colorByPoint: true,
        data: data,
        allowPointSelect: true,
        size: '75%',
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    ],
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Hit/Miss vs Profitable SKUs',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
  };
  return (
    <div className="individual-pie-chart">
      <Chart chartOptions={chartOptions} />
    </div>
  );
};
