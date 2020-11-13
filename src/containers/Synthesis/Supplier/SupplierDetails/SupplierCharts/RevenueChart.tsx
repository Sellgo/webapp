import React, { Component } from 'react';
import { Product } from '../../../../../interfaces/Product';
import { renderToString } from 'react-dom/server';
import { Grid, Image } from 'semantic-ui-react';
import Chart from '../../../../../components/Chart/Chart';
import { showNAIfZeroOrNull } from '../../../../../utils/format';
import _ from 'lodash';

interface RevenueChartProps {
  products: Product[];
  profitFinderChartOptions: any;
  chartComponentRef: any;
}

class RevenueChart extends Component<RevenueChartProps> {
  render() {
    const { products, profitFinderChartOptions, chartComponentRef } = this.props;

    const product_titles = products.map(e => e.title);
    const profit = products.map(e => parseFloat(e.profit));
    const product_cost = products.map(e => parseFloat(e.product_cost));
    const prices = products.map(e => parseFloat(e.price));
    const image_urls = products.map(e => e.image_url);
    const fees = products.map(e => parseFloat(e.fees));
    const roi = products.map(e => parseFloat(e.roi));
    const upcs = products.map(e => e.upc);
    const eans = products.map(e => e.ean);
    const isbns = products.map(e => e.isbn);
    const asins = products.map(e => e.asin);
    const margins = products.map(e => e.margin);

    const data = [
      { color: '#00C802', negativeColor: '#FF4F00', name: 'Profit($)', data: profit },
      { color: '#FFE400', name: 'Amz fee($)', data: fees },
      { color: '#FF9200', name: 'COGS($)', data: product_cost },
    ];

    const tooltipPointFormatter = function(this: Highcharts.Point): string {
      const x = this.x;
      const productTitle = this.category;
      const styles: any = {
        titleStyle: {
          color: '#ffffff',
          width: '295px',
          whiteSpace: 'normal',
          marginBottom: '10px',
        },
        textStyle: {
          color: '#ffffff',
          fontSize: '1.1em',
          fontWeight: 'normal',
          paddingBottom: '3px',
        },
        captionStyle: {
          color: '#ffffff',
          fontSize: '0.9em',
          fontWeight: 'normal',
        },
        tooltipStyle: { width: '510px' },
        imageStyle: { display: 'inline-block', marginBottom: '5px' },
        leftColumnStyle: { padding: '5px 20px 0 0' },
        rightColumnStyle: { padding: 0 },
      };

      return renderToString(
        <div style={styles.tooltipStyle}>
          <Grid columns={2} verticalAlign="middle">
            <Grid.Column width={6} textAlign="center" style={styles.leftColumnStyle}>
              <Image
                src={
                  image_urls && image_urls[x] !== null
                    ? image_urls[x].replace('SL75', 'SL300')
                    : 'http://localhost:3000/images/intro.png'
                }
                centered
                style={styles.imageStyle}
              />
              <div style={styles.captionStyle}>ASIN: {showNAIfZeroOrNull(asins[x], asins[x])}</div>
              <div style={styles.captionStyle}>
                {upcs[x]
                  ? `UPC: ${upcs[x]}`
                  : eans[x]
                  ? `EAN: ${eans[x]}`
                  : isbns[x]
                  ? `ISBN: ${isbns[x]}`
                  : ''}
              </div>
            </Grid.Column>
            <Grid.Column style={styles.rightColumnStyle}>
              <div style={styles.titleStyle}>
                <h4>{productTitle}</h4>
              </div>
              <div style={styles.textStyle}>
                Price($): {showNAIfZeroOrNull(prices[x], prices[x])}
              </div>
              {data.map((series: any, index: number) => {
                return (
                  <div key={index} style={styles.textStyle}>
                    {series.name}: {series.data[x]}
                  </div>
                );
              })}
              <div style={styles.textStyle}>ROI: {showNAIfZeroOrNull(roi[x], roi[x] + '%')}</div>
              <div style={styles.textStyle}>
                Margin: {showNAIfZeroOrNull(margins[x], margins[x] + '%')}
              </div>
            </Grid.Column>
          </Grid>
        </div>
      );
    };

    const revenueChartOptions = {
      title: null,
      chart: {
        type: 'column',
        zoomType: 'x',
        animation: false,
      },
      xAxis: {
        categories: product_titles,
        labels: false,
      },
      yAxis: {
        title: {
          text: 'Revenue Component($)',
        },
        endOnTick: false,
        startOnTick: false,
        maxPadding: 0,
      },
      tooltip: {
        useHTML: true,
        headerFormat: null, //remove default format
        pointFormatter: tooltipPointFormatter,
        backgroundColor: '#757575',
        borderWidth: 0.1,
        borderRadius: 3,
        distance: 100,
        crosshairs: true,
        followPointer: true,
        followTouchMove: true,
        style: {
          padding: 0,
        },
      },
      legend: {
        align: 'center',
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          groupPadding: 0.05,
          pointPadding: 0.01,
          cropThreshold: 5,
          borderWidth: 0.1,
          cursor: 'pointer',
        },
        series: {
          events: {
            click: (e: any) => {
              window.open('https://www.amazon.com/dp/' + products[e.point.index].asin, '_blank');
            },
          },
        },
      },
      series: data.map((e: any) => {
        return { ...e, ...{ type: 'column' } };
      }),
    };

    const chartOptions = _.merge(_.cloneDeep(revenueChartOptions), profitFinderChartOptions);

    return <Chart chartOptions={chartOptions} componentRef={chartComponentRef} />;
  }
}

export default RevenueChart;
