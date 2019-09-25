import React from 'react';
import Chart from './Chart';

export interface LineChartOptions {
  title: string;
  data: any;
}

const renderLineChartOptions = (options: LineChartOptions) => {
  const { title, data } = options;
  return {
    chart: { zoomType: 'x' },
    title: {
      text: title,
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
    series: data,
  };
};

const LineChart = (props: any) => {
  const { options } = props;
  const chartOptions = renderLineChartOptions(options);
  return (
    <div className="individual-line-chart">
      <Chart chartOptions={options} />
    </div>
  );
};

export default LineChart;
