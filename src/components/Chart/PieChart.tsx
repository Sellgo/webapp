import React from 'react';
import Chart from './Chart';
import _ from 'lodash';

export interface PieChartData {
  name: string;
  y: number;
  sliced: boolean;
  selected: boolean;
  color: string;
}

export interface PieChartOptions {
  title: string;
  name: string;
  data: PieChartData[];
  [x: string]: any;
}

const renderPieChartOptions = (options: PieChartOptions) => {
  const { title, name, data, ...otherOptions } = options;

  /* Define default chart options for all pie charts here. */
  return _.merge(
    {
      chart: {
        type: 'pie',
      },
      title: {
        text: title,
        margin: 50,
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          size: '75%',
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              plotOptions: {
                pie: {
                  size: '65%',
                  dataLabels: {
                    alignTo: 'connectors',
                  },
                },
              },
            },
          },
        ],
      },
      series: [
        {
          type: 'pie',
          name: name,
          colorByPoint: true,
          data: data,
        },
      ],
    },
    otherOptions
  );
};

const PieChart = (props: any) => {
  const { options } = props;
  const chartOptions = renderPieChartOptions(options);
  return (
    <div className="individual-pie-chart">
      <Chart chartOptions={chartOptions} />
    </div>
  );
};

export default PieChart;
