import React from 'react';
import Chart from './Chart';

export interface StackChartOptions {
  title: string;
  data: any;
  productSKUs: any;
}

const renderStackChartOptions = (options: StackChartOptions, onBubbleDetails: Function) => {
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
      pointFormat: 'ROI(%): {point.name} <br/> {series.name}: {point.y}',
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
      series: {
        cursor: 'pointer',
        events: {
          click: (e: any) => {
            onBubbleDetails(e.point.index);
          },
        },
      },
    },
    series: data.map((e: any) => {
      return { ...e, ...{ type: 'column' } };
    }),
  };
};

const StackChart = (props: any) => {
  const { options, onBubbleDetails } = props;
  const chartOptions = renderStackChartOptions(options, onBubbleDetails);
  return (
    <div className="individual-stack-chart">
      <Chart chartOptions={chartOptions} />
    </div>
  );
};

export default StackChart;
