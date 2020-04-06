import React from 'react';
import Chart from './Chart';

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
}

const PieChart = (props: any) => {
  const { title, name, data } = props.options;

  const chartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: title,
      margin: 0,
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        size: '145px',
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
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
  };
  return (
    <div className="individual-pie-chart">
      <Chart chartOptions={chartOptions} />
    </div>
  );
};

export default PieChart;
