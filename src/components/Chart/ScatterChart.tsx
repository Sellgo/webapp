import React from 'react';
import Chart from './Chart';

export interface ScatterChartOptions {
  title: string;
  data: any;
}

const renderScatterChartOptions = (options: ScatterChartOptions) => {
  const { title, data } = options;
  return {
    chart: {
      type: 'scatter',
      zoomType: 'xy',
    },
    xAxis: {
      title: {
        text: 'Unit sold/mo',
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Profit($)',
      },
    },
    title: {
      text: title,
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 5,
          states: {
            hover: {
              enabled: true,
              lineColor: 'rgb(100,100,100)',
            },
          },
        },
        states: {
          hover: {
            marker: {
              enabled: false,
            },
          },
        },
      },
    },
    tooltip: {
      headerFormat: '<br/>',
      pointFormat: '{point.name}<br/>Units sold: {point.x} u/mo<br/> Profit($): {point.y}',
    },
    series: data,
  };
};

const ScatterChart = (props: any) => {
  const { options } = props;
  const chartOptions = renderScatterChartOptions(options);
  return (
    <div className="individual-scatter-chart">
      <Chart chartOptions={chartOptions} />
    </div>
  );
};

export default ScatterChart;
