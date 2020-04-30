import React from 'react';
import Chart from './Chart';
import _ from 'lodash';

export interface StackChartOptions {
  title: string;
  data: any;
  [x: string]: any;
}

const renderStackChartOptions = (options: StackChartOptions) => {
  const { title, data, ...otherOptions } = options;

  /* Define default chart options for all stack charts here. */
  return _.merge(
    {
      chart: {
        type: 'column',
        zoomType: 'x',
        animation: {
          enabled: true,
          duration: 1000,
        },
      },
      title: {
        text: title,
        margin: 50,
        align: 'center',
      },
      yAxis: {
        stackLabels: {
          enabled: true,
          allowOverlap: true,
          alignValue: 'center',
          style: {
            color: 'black',
          },
        },
      },
      tooltip: {
        backgroundColor: '#ffffff',
        animation: true,
        borderWidth: 0.1,
        borderRadius: 3,
        distance: 100,
        crosshairs: true,
        followPointer: true,
        followTouchMove: true,
        outside: true,
        style: {
          padding: 0,
        },
        valueDecimals: '2',
      },
      legend: {
        align: 'left',
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          groupPadding: 0.05,
          pointPadding: 0.01,
          borderWidth: 0.1,
          borderRadius: 3,
          dataLabels: {
            enabled: true,
            borderRadius: 2,
            allowOverlap: true,
          },
          cursor: 'pointer',
        },
      },
      series: data.map((e: any) => {
        return { ...e, ...{ type: 'column' } };
      }),
    },
    otherOptions
  );
};

const StackChart = ({ options }: { options: StackChartOptions }) => {
  const chartOptions = renderStackChartOptions(options);
  return (
    <div className="individual-stack-chart">
      <Chart chartOptions={chartOptions} />
    </div>
  );
};

export default StackChart;
