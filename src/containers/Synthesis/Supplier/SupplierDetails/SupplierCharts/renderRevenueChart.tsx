import React, { useState } from 'react';
import { Product } from '../../../../../interfaces/Product';
import StackChart from '../../../../../components/Chart/StackChart';
import { renderToString } from 'react-dom/server';
import { Icon, Grid, Image } from 'semantic-ui-react';

export default (products: Product[]) => {
  const [areDataLabelsVisible, setDataLabelsVisible] = useState(false);

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

  const xAxisLabelsFormatter = function(this: any): string {
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
  };

  const stackLabelFormatter = function(this: any): string {
    const labelValue = roi[this.x];
    return !this.isNegative && areDataLabelsVisible
      ? `ROI:${Number(String(labelValue).replace(/,/g, '')).toFixed()} %`
      : '';
  };

  const dataLabelsFormatter = function(this: any): string {
    const areCurrentlyVisible = this.series.columnMetrics.width > 30;
    if (areCurrentlyVisible !== areDataLabelsVisible) {
      setDataLabelsVisible(areCurrentlyVisible);
    }
    return areCurrentlyVisible ? this.y : '';
  };

  const tooltipPointFormatter = function(this: any): string {
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
            <div style={{ color: 'grey', fontSize: '0.9em' }}>UPC: {upcs[x] ? upcs[x] : 'N/A'}</div>
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
    title: 'Revenue Breakdown Comparison',
    data: data,
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
      },
    },
    tooltip: {
      useHTML: true,
      headerFormat: null, //remove default format
      pointFormatter: tooltipPointFormatter,
    },
    plotOptions: {
      column: {
        dataLabels: {
          formatter: dataLabelsFormatter,
        },
      },
      series: {
        events: {
          click: (e: any) => {
            window.open('https://www.amazon.com/dp/' + products[e.point.index].asin, '_blank');
          },
        },
      },
    },
  };

  return <StackChart options={chartOptions} />;
};
