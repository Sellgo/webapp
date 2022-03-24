import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import { GraphDataSeries } from '../../../../interfaces/PerfectStock/SalesProjection';

/* Styling */
import styles from './index.module.scss';

interface Props {
  graphs: GraphDataSeries[];
  index: number;
}

const SubChart = (props: Props) => {
  const { graphs, index } = props;

  /* If is array */
  let minDate = 0;
  let maxDate = 0;
  const graphFirstPoint = graphs[0].data[0];
  if (Array.isArray(graphFirstPoint)) {
    minDate = new Date(graphFirstPoint[0]).getTime() - 24 * 3600 * 1000 * 10;
  }

  const lengthOfGraphData = graphs[0].data.length;
  const graphLastPoint = graphs[0].data[lengthOfGraphData - 1];
  if (Array.isArray(graphLastPoint)) {
    maxDate = new Date(graphLastPoint[0]).getTime() + 24 * 3600 * 1000 * 10;
  }
  // minDate= new Date('2022-01-01').getTime();
  const dataWithAxisInfo = graphs?.map((item: GraphDataSeries, index) => {
    return {
      ...item,
      yAxis: index,
    };
  });

  function formatter(this: any) {
    if (this.isFirst || new Date(this.value).getDate() === new Date(maxDate).getDate()) {
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
          type: 'column',
        },

        title: {
          text: '',
        },

        yAxis: [
          {
            // left y axis
            title: {
              text: graphs[0].name,
            },
            labels: {
              enabled: true,
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
            rotation: 0,
            formatter: formatter,
            // y: 50,
            x: -25,
          },
          min: minDate,
          max: maxDate,
          tickInterval: 24 * 3600 * 1000,
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
          enabled: false,
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
  }, [graphs]);

  return (
    <div className={styles.graphWrapper}>
      <div id={`subchart-${index}`} className={styles.graph} />
    </div>
  );
};

export default SubChart;
