import React from 'react';
import Chart from '../../../../../components/Chart/Chart';

export default ({ productRanks, productInventories }: any) => {
  const data = [
    {
      yAxis: 0,
      type: 'line',
      step: true,
      name: 'Rank',
      color: '#FD8373',
      data: productRanks,
      zIndex: 2,
    },
    {
      yAxis: 1,
      type: 'column',
      name: 'Inventory',
      color: '#4AD991',
      data: productInventories,
      zIndex: 1,
    },
  ];

  const firstYAxisIndex = data.findIndex((element: any) => element.yAxis === 0);
  const secondYAxisIndex = data.findIndex((element: any) => element.yAxis === 1);

  const chartOptions = {
    chart: {
      zoomType: 'x',
    },
    title: {
      text: 'Rank vs Inventory',
      margin: 50,
      align: 'left',
    },
    xAxis: [
      {
        type: 'datetime',
        crosshair: true,
      },
    ],
    yAxis: [
      {
        // Primary yAxis
        min: 0,
        gridLineWidth: 0,
        minorGridLineWidth: 0,
        lineWidth: 2,
        title: {
          text: data[firstYAxisIndex === -1 ? 0 : firstYAxisIndex].name,
          align: 'high',
          style: {
            color: 'black',
          },
        },
      },
      {
        // Secondary yAxis
        min: 0,
        gridLineWidth: 0,
        minorGridLineWidth: 0,
        lineWidth: 2,
        title: {
          text: data[secondYAxisIndex === -1 ? 1 : secondYAxisIndex].name,
          align: 'high',
          style: {
            color: 'black',
          },
        },
        labels: {
          format: '{value}',
          style: {
            color: 'black',
          },
        },
        opposite: true,
      },
    ],
    tooltip: {
      shared: true,
    },
    legend: {
      align: 'left',
    },
    series: data,
  };

  return (
    <div className="individual-spline-chart">
      <Chart chartOptions={chartOptions} />
    </div>
  );
};
