import React from 'react';
import Chart from './Chart';

export interface StackChartOptions {
  title: string;
  data: any;
  productSKUs: any;
}

const renderStackChartOptions = (options: StackChartOptions) => {
  const { title, data, productSKUs } = options;
  return {
    chart: { type: 'column', zoomType: 'x' },
    title: {
      text: title,
      align: 'center',
    },
    xAxis: {
      categories: productSKUs,
      // max:10,
      visible: false,
    },
    yAxis: {
      // min: 0,
      // gridLineWidth: 0,
      // minorGridLineWidth: 0,
      title: {
        text: 'Profit($)',
      },
      stackLabels: {
        enabled: true,
        format: '<b>ROI %</b>',
        style: {
          fontWeight: 'bold',
          color: 'grey',
        },
      },
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: 'ROI(%): {point.total} <br/> {series.name}: {point.y}',
    },
    legend: {
      align: 'right',
      x: -30,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      backgroundColor: 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false,
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: data.map((e: any) => {
      return { ...e, ...{ type: 'column' } };
    }),
  };
};

const StackChart = (props: any) => {
  const { options } = props;
  const chartOptions = renderStackChartOptions(options);
  return (
    <div className="individual-stack-chart">
      <Chart chartOptions={chartOptions} />
    </div>
  );
};

export default StackChart;
