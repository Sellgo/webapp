import React, { Component } from 'react';
import { Product } from '../../../../../interfaces/Product';
import { renderToString } from 'react-dom/server';
import { Icon } from 'semantic-ui-react';
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
      const newEmptyLine = '<span style="opacity:0">_</span><br/><br/>';
      let tooltipContent =
        `<span style="font-family:'Work sans'"/>` +
        `<span style="font-weight:bold;font-size:1.3em;white-space:normal">${productTitle}</span><br/>` +
        `<span style="color:grey;font-size:0.9em">ASIN: ${asins[x] ? asins[x] : 'N/A'}, ` +
        `UPC: ${upcs[x] ? upcs[x] : 'N/A'}</span><br/>`;
      tooltipContent += newEmptyLine;
      tooltipContent += data
        .map((series: any) => `${series.name}: ${series.data[x]}<br/>` + newEmptyLine)
        .join('');
      tooltipContent += `ROI(%): ${roi[x] ? roi[x] : 'N/A'}<br/>` + newEmptyLine;
      tooltipContent += `Margin(%): ${margins[x] ? margins[x] : 'N/A'}`;
      tooltipContent += `<span/>`;
      return tooltipContent;
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
        align: 'center',
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
