import React from 'react';
import Chart from './Chart';

export interface StepLineChartOptions {
  title: string;
  product_timeline: any;
  data: any;
  [x: string]: any;
}

const renderStepLineChartOptions = (options: StepLineChartOptions) => {
  const { title, product_timeline, data, ...otherOptions } = options;
  return {
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
        categories: product_timeline,
        crosshair: true,
      },
    ],
    yAxis: {
      min: 0,
      title: {
        text: '',
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
    ...otherOptions,
  };
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
