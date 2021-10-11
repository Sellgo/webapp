import React, { memo } from 'react';
import { cloneDeep, merge } from 'lodash';

/* Styling */
import styles from './index.module.scss';

/* Components */
import Chart from '../../../../../components/Chart/Chart';

/* Interfaces */
import { KeywordDatabaseAggSummary } from '../../../../../interfaces/KeywordResearch/KeywordDatabase';

/* Utils */
import { graphColors } from '../../../../../utils/colors';

const chartOptions = {
  lang: {
    noData: '',
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
    enabled: false,
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
      colors: graphColors,
    },
  },
  legend: {
    enabled: true,
    layout: 'vertical',
    backgroundColor: '#FFFFFF',
    floating: true,
    align: 'right',
    verticalAlign: 'top',
  },
};

interface Props {
  data: KeywordDatabaseAggSummary;
}

const KeywordDistribution = (props: Props) => {
  const { data } = props;

  const pieChartOptions = merge(cloneDeep(chartOptions), {
    series: [
      {
        type: 'pie',
        innerSize: '60%',
        animation: false,
        name: 'name',
        colorByPoint: true,
        data:
          data &&
          Object.entries(data).map(dataPoint => {
            return {
              name: dataPoint[0],
              y: dataPoint[1],
            };
          }),
      },
    ],
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
