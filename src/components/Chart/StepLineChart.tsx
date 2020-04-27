import React from 'react';
import Chart from './Chart';

export interface StepLineChartOptions {
  title: string;
  data: any;
}

const renderStepLineChartOptions = (options: StepLineChartOptions) => {
  const { title, data } = options;
  return {
    chart: { zoomType: 'x' },
    title: {
      text: title,
      margin: 50,
      align: 'left',
    },
    xAxis: {
      type: 'datetime',
      labels: {
        style: {
          color: '#ccc',
        },
      },
    },
    credits: {
      enabled: false,
    },
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
      /* layout: 'vertical',
        x: 120,
        verticalAlign: 'top',
        y: 100,
        floating: true, */
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
  };
};

const StepLineChart = (props: any) => {
  const { options } = props;
  const chartOptions = renderStepLineChartOptions(options);
  return (
    <div className="individual-line-chart">
      <Chart chartOptions={chartOptions} />
    </div>
  );
};

export default StepLineChart;
