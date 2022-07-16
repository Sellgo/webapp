import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import { GraphDataSeries } from '../../../../../interfaces/PerfectStock/SalesProjection';

/* Styling */
import styles from './index.module.scss';
import { TIME_SETTING } from '../../../../../constants/PerfectStock/OrderPlanning';

interface Props {
  data: GraphDataSeries[];
  xAxisStartDate: string;
  timeSetting: string;
  className?: string;
}
const ProductSalesGraph = (props: Props) => {
  const { data, timeSetting, xAxisStartDate, className } = props;
  useEffect(() => {
    const chartMount = document.getElementById('product-sales-graph');
    if (chartMount) {
      Highcharts.chart({
        chart: {
          renderTo: 'product-sales-graph',
          type: 'line',
        },

        title: {
          text: '',
        },

        yAxis: {
          title: {
            text: '',
          },
        },

        xAxis: {
          type: 'datetime',
        },

        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          floating: true,
        },

        plotOptions: {
          series: {
            label: {
              connectorAllowed: false,
            },
            pointStart: new Date(xAxisStartDate).getTime(),
            pointInterval: timeSetting === TIME_SETTING.DAY ? 1 : 7,
            pointIntervalUnit: 'day',
          },
        },

        series: data,

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 1000,
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'top',
                },
              },
            },
          ],
        },
      });
    }
  }, [data]);

  return (
    <div className={`${styles.graphWrapper} ${className}`}>
      <div id="product-sales-graph" className={styles.graph} />
    </div>
  );
};

export default ProductSalesGraph;
