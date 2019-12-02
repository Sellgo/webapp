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
    },
    title: {
      text: title,
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
          alignTo: 'connectors',
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
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
