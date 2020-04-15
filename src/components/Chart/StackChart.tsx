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
        text: 'Sub-revenue($)',
      },
      stackLabels: {
        style: {
          color: 'black',
        },
        enabled: true,
        formatter: function(this: any): string {
          return `${
            data.find(function(d: any) {
              return d.name === 'ROI(%)';
            }).data[this.x]
          } %`;
        },
      },
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}',
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
        gapSize: 3,
        edgeWidth: 1,
        shadow: false,
        dataLabels: {
          enabled: true,
          borderRadius: 2,
        },
      },
      series: {
        cursor: 'pointer',
        stacking: 'normal',
        //pointWidth: 20,
        events: {
          click: (e: any) => {
            onBubbleDetails(e.point.index);
          },
        },
      },
    },
    series: data
      .filter(function(d: any) {
        return d.name !== 'ROI(%)';
      })
      .map((e: any) => {
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
