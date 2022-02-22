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
}
const ProductSalesGraph = (props: Props) => {
  const { data, timeSetting, xAxisStartDate } = props;

  const dataWithAxisInfo = data.map((item: GraphDataSeries, index) => {
    return {
      ...item,
      yAxis: index,
    };
  });
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

        yAxis: [
          {
            // left y axis
            title: {
              text: null,
            },
            labels: {
              align: 'left',
              x: 3,
              y: 16,
            },
            showFirstLabel: false,
          },
          {
            // right y axis
            gridLineWidth: 0,
            opposite: true,
            title: {
              text: null,
            },
            labels: {
              align: 'right',
              x: 3,
              y: 16,
            },
            showFirstLabel: false,
          },
        ],

        xAxis: {
          type: 'datetime',
        },

        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
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

        series: dataWithAxisInfo,

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
                  verticalAlign: 'bottom',
                },
              },
            },
          ],
        },
      });
    }
  }, [data]);

  return (
    <div className={styles.graphWrapper}>
      <div id="product-sales-graph" className={styles.graph} />
    </div>
  );
};

export default ProductSalesGraph;
