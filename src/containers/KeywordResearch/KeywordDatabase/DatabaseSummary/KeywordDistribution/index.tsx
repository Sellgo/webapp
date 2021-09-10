import React, { memo } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import Chart from '../../../../../components/Chart/Chart';

/* Interfaces */
import { KeywordDatabaseAggSummary } from '../../../../../interfaces/KeywordResearch/KeywordDatabase';
import { cloneDeep, merge } from 'lodash';

const chartOptions = {
  lang: {
    noData: 'No aggregation results found',
  },
  title: {
    text: '',
  },

  chart: {
    plotBackgroundColor: '#F9FAFC',
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
    height: 230,
    margin: [0, 0, 0, 0],
    spacingTop: 0,
    spacingBottom: 0,
    spacingLeft: 0,
    spacingRight: 0,
  },

  tooltip: {
    headerFormat:
      '<span style="font-size: 18px;color:{point.color}">●</span>' +
      '<span style="font-size: 12px;font-weight:bold;">{point.key}</span><br/>',
    style: {
      color: 'white',
      opacity: 0.9,
    },
    backgroundColor: '#F9FAFC',
    shadow: false,
    borderWidth: 0,
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
  },

  plotOptions: {
    pie: {
      center: ['50%', '50%'],
      dataLabels: {
        enabled: false,
      },
      size: '50%',
      animation: false,
      allowPointSelect: false,
      cursor: 'pointer',
      borderColor: '#F9FAFC',
    },
  },
};

interface Props {
  data: KeywordDatabaseAggSummary;
}

const KeywordDistribution = (props: Props) => {
  const { data } = props;

  const plotData =
    data &&
    Object.entries(data).map(dataPoint => {
      return {
        name: dataPoint[0],
        y: dataPoint[1],
      };
    });

  const pieChartOptions = merge(cloneDeep(chartOptions), {
    series: {
      innerSize: '50%',
      animation: false,
      name: 'name',
      colorByPoint: true,
      data: plotData,
    },
  });

  return (
    <div className={styles.keywordDistribution}>
      <div className={styles.distributionStats}>
        <span>56,563</span>
      </div>

      <div className={styles.distributionPie}>
        <Chart chartOptions={pieChartOptions} />
      </div>
    </div>
  );
};

export default memo(KeywordDistribution);
