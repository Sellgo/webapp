import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import { Dimmer, Loader } from 'semantic-ui-react';

/* Constants */
import { CASH_FLOW_CHART_DETAILS } from '../../../../constants/PerfectStock/Cashflow';

/* Types */
import { GraphDataSeries } from '../../../../interfaces/PerfectStock/SalesProjection';

/* Styling */
import styles from './index.module.scss';

import { formatDecimal } from '../../../../utils/format';

interface Props {
  isLoading?: boolean;
  graphs: GraphDataSeries[];
  index: number;
  total?: number;
}

const SubChart = (props: Props) => {
  const { graphs, index, total, isLoading } = props;

  const dataWithAxisInfo = graphs?.map((item: GraphDataSeries, index) => {
    return {
      ...item,
      yAxis: index,
    };
  });

  function formatter(this: any) {
    if (this.isFirst || this.isLast) {
      return Highcharts.dateFormat('%b %e', this.value);
    }
    return '';
  }

  useEffect(() => {
    const chartMount = document.getElementById(`subchart-${index}`);
    if (chartMount && dataWithAxisInfo.length > 0) {
      Highcharts.chart({
        chart: {
          renderTo: `subchart-${index}`,
          type: 'line',
          spacingLeft: 30,
        },

        title: {
          align: 'left',
          text: `
            <p class="${styles.chartTitle}"> ${CASH_FLOW_CHART_DETAILS[graphs[0].name].title} </p>
            <h2 class="${styles.chartTotal}"> 
              ${CASH_FLOW_CHART_DETAILS[graphs[0].name].unitPrepend}
              ${total ? formatDecimal(total) : '0'} 
              ${CASH_FLOW_CHART_DETAILS[graphs[0].name].unitAppend}
            </h2>
          `,
          useHTML: true,
        },

        yAxis: [
          {
            // left y axis
            title: {
              text: '',
            },
            labels: {
              enabled: true,
              align: 'left',
              x: -20,
            },
            showFirstLabel: false,
            gridLineWidth: 0,
          },
        ],

        xAxis: {
          labels: {
            align: 'left',
            enabled: true,
            style: {
              color: '#919FB2',
            },
            formatter: formatter,
          },
          // tickInterval: 24 * 3600 * 1000,
          type: 'datetime',
          // gridLineColor: '#e6e6e6',
          // lineWidth: 0,
          dateTimeLabelFormats: {
            day: '%e %b',
            week: '%e %b',
            month: '%b %y',
            year: '%Y',
          },
        },

        legend: {
          enabled: false,
        },

        plotOptions: {
          series: {
            label: {
              connectorAllowed: false,
            },
            pointIntervalUnit: 'day',
          },
          column: {
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
  }, [graphs]);

  return (
    <div className={styles.graphWrapper}>
      <Dimmer active={isLoading} inverted>
        <Loader active />
      </Dimmer>
      <div id={`subchart-${index}`} className={styles.graph} />
    </div>
  );
};

export default SubChart;
