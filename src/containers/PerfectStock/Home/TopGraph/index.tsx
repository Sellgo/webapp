import React, { useEffect } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import Highcharts from 'highcharts';

/* Types */
import { GraphDataSeries } from '../../../../interfaces/PerfectStock/SalesProjection';

/* Styling */
import styles from './index.module.scss';

interface Props {
  isLoading?: boolean;
  data: GraphDataSeries[];
}
const ProductSalesGraph = (props: Props) => {
  const { data, isLoading } = props;

  const dataWithAxisInfo = data?.map((item: GraphDataSeries, index) => {
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
              x: -5,
              y: 16,
            },
            showFirstLabel: true,
            gridLineDashStyle: 'LongDash',
          },
        ],

        xAxis: {
          type: 'datetime',
          gridLineDashStyle: 'LongDash',
          gridLineColor: '#e6e6e6',
          gridLineWidth: 1,
          minTickInterval: 1,
          tickInterval: 24 * 3600 * 1000 * 30,
          dateTimeLabelFormats: {
            day: '%e %b',
            week: '%e %b',
            month: '%b %y',
            year: '%Y',
          },
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
            pointIntervalUnit: 'day',
          },
          line: {
            animation: {
              duration: 0,
            },
            showInLegend: false,
            color: '#B418F2',
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
      <Dimmer active={isLoading} inverted>
        <Loader active />
      </Dimmer>
      <div id="product-sales-graph" className={styles.graph} />
    </div>
  );
};

export default ProductSalesGraph;
