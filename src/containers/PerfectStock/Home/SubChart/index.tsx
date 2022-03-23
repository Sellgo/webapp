import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import { GraphDataSeries } from '../../../../interfaces/PerfectStock/SalesProjection';

/* Styling */
import styles from './index.module.scss';

interface Props {
  data: GraphDataSeries[];
  index: number;
}

const SubChart = (props: Props) => {
  const { data, index } = props;
  console.log(data);

  const dataWithAxisInfo = data?.map((item: GraphDataSeries, index) => {
    return {
      ...item,
      yAxis: index,
    };
  });

  function formatter(this: any) {
    if (this.isLast || this.isFirst) {
      return new Date(this.value).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
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
        },

        title: {
          text: '',
        },

        yAxis: [
          {
            // left y axis
            title: {
              text: 'Sub Chart',
            },
            labels: {
              enabled: false,
              align: 'left',
              x: -5,
              y: 16,
            },
            showFirstLabel: true,
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
          type: 'datetime',
          gridLineColor: '#e6e6e6',
          lineWidth: 0,
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
      <div id={`subchart-${index}`} className={styles.graph} />
    </div>
  );
};

export default SubChart;
