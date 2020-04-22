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

const renderPieChartOptions = (options: PieChartOptions) => {
  const { title, name, data } = options;
  return {
    chart: {
      type: 'pie',
      width: 200,
      height: 200,
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
        borderWidth: 0.5,
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
};

const UploadStepPieChart = (props: any) => {
  const { options } = props;
  const chartOptions = renderPieChartOptions(options);
  return (
    <div className="individual-pie-chart">
      <Chart chartOptions={chartOptions} />
    </div>
  );
};

export default UploadStepPieChart;
