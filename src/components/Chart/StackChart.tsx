import React from 'react';
import Chart from './Chart';
import { renderToString } from 'react-dom/server';
import { Icon } from 'semantic-ui-react';

export interface StackChartOptions {
  title: string;
  data: any;
  productSKUs: any;
  amazon_urls?: any;
}

const renderStackChartOptions = (options: StackChartOptions, onBubbleDetails: Function) => {
  const { title, data, productSKUs, amazon_urls } = options;

  return {
    chart: {
      type: 'column',
      zoomType: 'x',
      //RP200414: adding chart UI adjustment - begin
      animation: {
        enabled: true,
        duration: 1000,
      },
      //RP200414: adding chart UI adjustment - end
    },

    title: {
      text: title,
      margin: 50,
      align: 'center',
    },
    xAxis: {
      categories: productSKUs,
      // max:10,
      // visible: false,
      labels: {
        useHTML: true,
        formatter: function(this: any): string {
          return amazon_urls && amazon_urls[this.pos]
            ? renderToString(
                <a
                  style={{ cursor: 'pointer' }}
                  className="img-pos"
                  href={amazon_urls[this.pos]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="amazon" size={'large'} style={{ color: 'black' }} />
                </a>
              )
            : '';
        },
      },
    },
    yAxis: {
      // min: 0,
      // gridLineWidth: 0,
      // minorGridLineWidth: 0,
      title: {
        text: 'Sub-Revenue($)',
      },
      stackLabels: {
        enabled: true,
        alignValue: 'center',
        style: {
          color: 'black',
        },
        formatter: function(this: any): string {
          const labelValue = data.find(function(d: any) {
            return d.name === 'ROI(%)';
          }).data[this.x];
          return !this.isNegative ? `${labelValue} %` : '';
        },
      },
    },
    tooltip: {
      //RP200414: adding tooltip UI adjustment - begin
      backgroundColor: '#ffffff',
      animation: true,
      borderWidth: 0.1,
      borderRadius: 3,
      distance: 75,
      shadow: true,
      crosshairs: true,
      followPointer: true,
      followTouchMove: true,
      //RP200414: adding tooltip UI adjustment - end

      outside: true,
      style: {
        padding: 0,
      },

      //RP200414: adding new tooltip structure - begin
      headerFormat: '<large>{point.x} </large><table>',
      pointFormat:
        '<tr><td style="">{series.name}</td>' +
        '<td style="text-align: right"><b>{point.y} USD</b></td></tr>' +
        '<tr><td style="">ROI:</td>' +
        '<td style="text-align: right"><b>{data[3].data[this.point.x]} %</td></tr>',
      footerFormat: '</table>',
      valueDecimals: '2',
      //shared: true,
      useHTML: true,
      //RP200414: adding new tooltip structure - begin
    },

    legend: {
      align: 'left',
    },
    plotOptions: {
      column: {
        stacking: 'normal',

        //RP200414: adding stackChart UI adjustment - begin
        groupPadding: 0.05,
        pointPadding: 0.01,
        borderWidth: 0.1,
        borderRadius: 3,
        gapSize: 3,
        edgeWidth: 1,
        shadow: false,
        //RP200414: adding stackChart UI adjustment - begin

        dataLabels: {
          enabled: true,
          borderRadius: 2,
        },
      },
      series: {
        cursor: 'pointer',
        stacking: 'normal',
        events: {
          click: (e: any) => {
            onBubbleDetails(e.point.index);
          },
        },
      },
    },
    series: data

      //RP200414: adding stackChart ROI render filter, need to optimize - begin
      .filter((e: any) => {
        return e.name !== 'ROI(%)';
      })
      //RP200414: adding stackChart ROI render filter, need to optimize - end

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
