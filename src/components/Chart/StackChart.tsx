import React from 'react';
import Chart from './Chart';
import { renderToString } from 'react-dom/server';
import { Grid, Icon, Image } from 'semantic-ui-react';

export interface StackChartOptions {
  title: string;
  data: any;
  productSKUs: any;
  amazon_urls?: any;
  image_urls?: any;
  asins?: any;
  upcs?: any;
}

const renderStackChartOptions = (options: StackChartOptions, onBubbleDetails: Function) => {
  const { title, data, productSKUs, amazon_urls, image_urls, asins, upcs } = options;

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
      headerFormat: null, //remove default format
      pointFormatter: function(this: any): string {
        const x = this.x;
        const productTitle = this.category;

        return renderToString(
          <div style={{ width: '500px' }}>
            <Grid columns={2} verticalAlign="middle">
              <Grid.Column width={6} textAlign="center" style={{ padding: '5px 0 0 0' }}>
                <Image
                  src={
                    image_urls && image_urls[x] !== null
                      ? image_urls[x]
                      : 'http://localhost:3000/images/intro.png'
                  }
                  centered
                  style={{ display: 'inline-block' }}
                />
              </Grid.Column>
              <Grid.Column style={{ padding: 0 }}>
                <div style={{ width: '312.5px', whiteSpace: 'normal' }}>
                  <h4>{productTitle}</h4>
                </div>
                <div>ASIN: {asins[x] ? asins[x] : 'N/A'}</div>
                <div>UPC: {upcs[x] ? upcs[x] : 'N/A'}</div>
                {data.map((series: any, index: number) => {
                  return (
                    <div key={index}>
                      {series.name}: {series.data[x]}
                    </div>
                  );
                })}
              </Grid.Column>
            </Grid>
          </div>
        );
      },
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
