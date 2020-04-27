import React from 'react';
import Chart from './Chart';

export interface StackChartPTROptions {
  title: string;
  data: any;
}

const renderStackChartPTROptions = (options: StackChartPTROptions) => {
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
    },
    series: data.map((e: any) => {
      return {
        ...e,
        ...{
          type: 'column',
          //yAxis: '1',
          tooltip: {
            valueDecimals: 0,
          },
        },
      };
    }),
  };
};

const StackChartPTR = (props: any) => {
  const { options } = props;
  const chartOptions = renderStackChartPTROptions(options);
  return (
    <div className="individual-stack-chart">
      <Chart chartOptions={chartOptions} />
    </div>
  );
};

export default StackChartPTR;
