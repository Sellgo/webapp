import React, { Component } from 'react';
import { Product } from '../../../../../interfaces/Product';
import { renderToString } from 'react-dom/server';
import { Grid, Image } from 'semantic-ui-react';
import Chart from '../../../../../components/Chart/Chart';
import { showNAIfZeroOrNull } from '../../../../../utils/format';

interface RevenueChartProps {
  products: Product[];
}

class RevenueChart extends Component<RevenueChartProps> {
  render() {
    const { products } = this.props;

    const productSKUs = products.map(e => e.title);
    const profit = products.map(e => parseFloat(e.profit));
    const product_cost = products.map(e => parseFloat(e.product_cost));
    const image_urls = products.map(e => e.image_url);
    const fees = products.map(e => parseFloat(e.fees));
    const roi = products.map(e => parseFloat(e.roi));
    const upcs = products.map(e => e.upc);
    const asins = products.map(e => e.asin);
    const margins = products.map(e => e.margin);

    const data = [
      { color: '#CAE1F3', negativeColor: '#FD8373', name: 'Profit($)', data: profit },
      { color: '#F3D2CA', name: 'Amz fee($)', data: fees },
      { color: '#F3E9CA', name: 'COGS($)', data: product_cost },
    ];

    const tooltipPointFormatter = function(this: Highcharts.Point): string {
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
                ASIN: {showNAIfZeroOrNull(asins[x], asins[x])}
              </div>
              <div style={{ color: 'grey', fontSize: '0.9em' }}>
                UPC: {showNAIfZeroOrNull(upcs[x], upcs[x])}
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
              <div>ROI(%): {showNAIfZeroOrNull(roi[x], roi[x])}</div>
              <div>Margin(%): {showNAIfZeroOrNull(margins[x], margins[x])}</div>
            </Grid.Column>
          </Grid>
        </div>
      );
    };

    const chartOptions = {
      title: {
        text: 'Revenue Breakdown Comparison',
        margin: 50,
        align: 'center',
      },
      chart: {
        type: 'column',
        zoomType: 'x',
        animation: {
          enabled: true,
        },
      },
      xAxis: {
        categories: productSKUs,
        labels: false,
      },
      yAxis: {
        title: {
          text: 'Sub-Revenue($)',
        },
      },
      tooltip: {
        useHTML: true,
        headerFormat: null, //remove default format
        pointFormatter: tooltipPointFormatter,
        backgroundColor: '#ffffff',
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
          borderRadius: 3,
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

    return <Chart chartOptions={chartOptions} />;
  }
}

export default RevenueChart;
