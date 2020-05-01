import React from 'react';
import Chart from './Chart';
import _ from 'lodash';

export interface StepLineChartOptions {
  title: string;
  data: any;
  [x: string]: any;
}

const renderStepLineChartOptions = (options: StepLineChartOptions) => {
  const { title, data, ...otherOptions } = options;
  const allDataPoints = data
    .map((series: any) => series.data)
    .flat()
    .map((item: any) => item[1]);
  const yMin = Math.min(...allDataPoints);
  const yMax = Math.max(...allDataPoints);

  /* Define chart options which are generic to all Step Line charts here. */
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
      yAxis: {
        min: yMin || 0,
        max: yMax || null,
        title: {
          text: '', // remove default value
        },
        labels: {
          style: {
            color: '#ccc',
          },
        },
      },
      tooltip: {
        shared: true,
      },
      legend: {
        align: 'left',
      },
      series: data.map((e: any) => {
        return {
          ...e,
          ...{
            type: 'line',
            step: true,
            tooltip: {
              valueDecimals: 0,
            },
          },
        };
      }),
    },
    otherOptions
  );
};

const StepLineChart = (props: any) => {
  const { options } = props;
  const chartOptions = renderStepLineChartOptions(options);
  return (
    <div className="individual-stepline-chart">
      <Chart chartOptions={chartOptions} />
    </div>
  );
};

export default StepLineChart;
