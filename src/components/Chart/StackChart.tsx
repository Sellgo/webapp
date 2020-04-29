import React, { useState } from 'react';
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
  margins?: any;
  areDataLabelsVisible?: boolean;
  setDataLabelsVisible?: any;
}

const renderStackChartOptions = (options: StackChartOptions, onBubbleDetails: Function) => {
  const {
    title,
    data,
    productSKUs,
    amazon_urls,
    image_urls,
    asins,
    upcs,
    margins,
    areDataLabelsVisible,
    setDataLabelsVisible,
  } = options;

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
      labels: {
        useHTML: true,
        formatter: function(this: any): string {
          return areDataLabelsVisible && amazon_urls && amazon_urls[this.pos]
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
      title: {
        text: 'Sub-Revenue($)',
      },
      stackLabels: {
        enabled: true,
        allowOverlap: true,
        alignValue: 'center',
        style: {
          color: 'black',
        },
        formatter: function(this: any): string {
          const labelValue = data.find(function(d: any) {
            return d.name === 'ROI(%)';
          }).data[this.x];
          return !this.isNegative && areDataLabelsVisible
            ? `ROI:${Number(String(labelValue).replace(/,/g, '')).toFixed()} %`
            : '';
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
                <div style={{ color: 'grey', fontSize: '0.9em' }}>
                  ASIN: {asins[x] ? asins[x] : 'N/A'}
                </div>
                <div style={{ color: 'grey', fontSize: '0.9em' }}>
                  UPC: {upcs[x] ? upcs[x] : 'N/A'}
                </div>
              </Grid.Column>
              <Grid.Column style={{ padding: 0 }}>
                <div style={{ width: '312.5px', whiteSpace: 'normal' }}>
                  <h4>{productTitle}</h4>
                </div>
                {data.map((series: any, index: number) => {
                  return (
                    <div key={index}>
                      {series.name}: {series.data[x]}
                    </div>
                  );
                })}
                <div>Margin(%): {margins[x] ? margins[x] : 'N/A'}</div>
              </Grid.Column>
            </Grid>
          </div>
        );
      },
      valueDecimals: '2',
      useHTML: true,
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
          formatter: function(this: any): string {
            const areCurrentlyVisible = this.series.columnMetrics.width > 30;
            if (areCurrentlyVisible !== areDataLabelsVisible) {
              setDataLabelsVisible(areCurrentlyVisible);
            }
            return areCurrentlyVisible ? this.y : '';
          },
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
      .filter((e: any) => {
        return e.name !== 'ROI(%)';
      })
      .map((e: any) => {
        return { ...e, ...{ type: 'column' } };
      }),
  };
};

const StackChart = (props: any) => {
  const [areDataLabelsVisible, setDataLabelsVisible] = useState(false);
  const { options, onBubbleDetails } = props;
  const chartOptions = renderStackChartOptions(
    { ...options, areDataLabelsVisible, setDataLabelsVisible },
    onBubbleDetails
  );
  return (
    <div className="individual-stack-chart">
      <Chart chartOptions={chartOptions} />
    </div>
  );
};

export default StackChart;
