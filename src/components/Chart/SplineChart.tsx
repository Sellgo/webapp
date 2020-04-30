import React from 'react';
import Chart from './Chart';
import _ from 'lodash';

export interface SplineChartOptions {
  title: string;
  data: any;
  [x: string]: any;
}

const renderSplineChartOptions = (options: SplineChartOptions) => {
  const { title, data, ...otherOptions } = options;
  const firstYAxisIndex = data.findIndex((element: any) => element.yAxis === 0);
  const secondYAxisIndex = data.findIndex((element: any) => element.yAxis === 1);

  /* Define default chart options for all spline charts here. */
  return _.merge(
    {
      chart: {
        zoomType: 'x',
      },
      title: {
        text: title,
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
    },
    otherOptions
  );
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
