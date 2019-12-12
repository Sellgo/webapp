import React from 'react';
import Chart from './Chart';

export interface SplineChartOptions {
  title: string;
  product_timeline: any;
  data: any;
}

const renderSplineChartOptions = (options: SplineChartOptions) => {
  const { title, product_timeline, data } = options;
  return {
    chart: {
      zoomType: 'xy',
    },
    title: {
      text: title,
    },
    xAxis: [
      {
        type: 'datetime',
        categories: product_timeline,
        crosshair: true,
      },
    ],
    yAxis: [
      {
        // Primary yAxis
        gridLineWidth: 0,
        minorGridLineWidth: 0,
        lineWidth: 2,
        title: {
          text: 'Total Profit($)',
          align: 'high',
          style: {
            color: 'black',
          },
        },
      },
      {
        // Secondary yAxis
        gridLineWidth: 0,
        minorGridLineWidth: 0,
        lineWidth: 2,
        title: {
          text: 'ROI(%)',
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
};

const SplineChart = (props: any) => {
  const { options } = props;
  const chartOptions = renderSplineChartOptions(options);
  return (
    <div className="individual-spline-chart">
      <Chart chartOptions={chartOptions} />
    </div>
  );
};

export default SplineChart;
