import React, { Component } from 'react';
import { Product } from '../../../../../interfaces/Product';
import { renderToString } from 'react-dom/server';
import { Icon, Grid, Image } from 'semantic-ui-react';
import Chart from '../../../../../components/Chart/Chart';

interface RevenueChartProps {
  products: Product[];
}

interface RevenueChartState {
  isLabelsVisible: boolean;
}

export const labelVisibilityColumnWidthValue = 30;

class RevenueChart extends Component<RevenueChartProps, RevenueChartState> {
  constructor(props: RevenueChartProps) {
    super(props);
    this.state = {
      isLabelsVisible: false,
    };
  }

  handleChartRender = (e: any) => {
    const { isLabelsVisible } = this.state;
    const areCurrentlyVisible =
      e.target.series[0].columnMetrics.width > labelVisibilityColumnWidthValue;
    if (areCurrentlyVisible !== isLabelsVisible) {
      this.setState({ isLabelsVisible: areCurrentlyVisible });
    }
  };

  render() {
    const { products } = this.props;
    const { isLabelsVisible } = this.state;

    const productSKUs = products.map(e => e.title);
    const profit = products.map(e => parseFloat(e.profit));
    const product_cost = products.map(e => parseFloat(e.product_cost));
    const fees = products.map(e => parseFloat(e.fees));
    const roi = products.map(e => parseFloat(e.roi));
    const amazon_urls = products.map(e => e.amazon_url);
    const upcs = products.map(e => e.upc);
    const asins = products.map(e => e.asin);
    const image_urls = products.map(e => e.image_url);
    const margins = products.map(e => e.margin);

    const data = [
      { color: '#CAE1F3', negativeColor: '#FD8373', name: 'Profit($)', data: profit },
      { color: '#F3D2CA', name: 'Amz fee($)', data: fees },
      { color: '#F3E9CA', name: 'COGS($)', data: product_cost },
    ];

    const xAxisLabelsFormatter = function(
      this: Highcharts.AxisLabelsFormatterContextObject
    ): string {
      return isLabelsVisible && amazon_urls && amazon_urls[this.pos]
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
    };

    const stackLabelFormatter = function(this: Highcharts.StackItemObject): string {
      const labelValue = roi[this.x];
      return !this.isNegative && isLabelsVisible
        ? `ROI:${Number(String(labelValue).replace(/,/g, '')).toFixed()} %`
        : '';
    };

    const dataLabelsFormatter = function(this: Highcharts.PointLabelObject): string {
      return isLabelsVisible ? String(this.y) : '';
    };

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
              <div>ROI(%): {roi[x] ? roi[x] : 'N/A'}</div>
              <div>Margin(%): {margins[x] ? margins[x] : 'N/A'}</div>
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
          duration: 1000,
        },
        events: {
          render: this.handleChartRender.bind(this),
        },
      },
      xAxis: {
        categories: productSKUs,
        labels: {
          useHTML: true,
          formatter: xAxisLabelsFormatter,
        },
      },
      yAxis: {
        title: {
          text: 'Sub-Revenue($)',
        },
        stackLabels: {
          formatter: stackLabelFormatter,
          enabled: true,
          allowOverlap: true,
          alignValue: 'center',
          style: {
            color: 'black',
          },
        },
      },
      tooltip: {
        useHTML: true,
        headerFormat: null, //remove default format
        pointFormatter: tooltipPointFormatter,
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
        valueDecimals: '2',
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
            formatter: dataLabelsFormatter,
            enabled: true,
            borderRadius: 2,
            allowOverlap: true,
          },
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
