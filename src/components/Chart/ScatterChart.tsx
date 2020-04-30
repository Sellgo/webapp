import React from 'react';
import Chart from './Chart';
import _ from 'lodash';

export interface ScatterChartOptions {
  title: string;
  data: any;
  [x: string]: any;
}

const renderScatterChartOptions = (options: ScatterChartOptions, onBubbleDetails: Function) => {
  const { title, data, ...otherOptions } = options;

  /* Define default chart options for all scatter charts here. */
  return _.merge(
    {
      chart: {
        type: 'scatter',
        zoomType: 'xy',
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
        series: {
          cursor: 'pointer',
          events: {
            click: (e: any) => {
              onBubbleDetails(e.point.index);
            },
          },
        },
      },
      tooltip: {
        headerFormat: '<br/>',
        pointFormat: '{point.name}<br/>Units sold: {point.x} u/mo<br/> Profit($): {point.y}',
      },
      series: data,
    },
    otherOptions
  );
};

const ScatterChart = (props: any) => {
  const { options, onBubbleDetails } = props;
  const chartOptions = renderScatterChartOptions(options, onBubbleDetails);
  return (
    <div className="individual-scatter-chart">
      <Chart chartOptions={chartOptions} />
    </div>
  );
};

export default ScatterChart;
