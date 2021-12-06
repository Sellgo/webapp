import React, { memo } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Interfaces */
import { KeywordDatabaseAggSummary } from '../../../../../interfaces/KeywordResearch/KeywordDatabase';

/* Utils */
import { formatNumber, showNAIfZeroOrNull } from '../../../../../utils/format';

// const chartOptions = {
//   lang: {
//     noData: '',
//   },

//   title: {
//     text: '',
//   },

//   chart: {
//     plotBackgroundColor: '#F9FAFC',
//     plotBorderWidth: null,
//     plotShadow: false,
//     type: 'pie',
//     height: 230,
//     margin: [0, 0, 0, 0],
//     spacingTop: 0,
//     spacingBottom: 0,
//     spacingLeft: 0,
//     spacingRight: 0,
//   },

//   tooltip: {
//     enabled: false,
//   },

//   plotOptions: {
//     pie: {
//       center: ['50%', '50%'],
//       dataLabels: {
//         enabled: false,
//       },
//       size: '50%',
//       animation: false,
//       allowPointSelect: false,
//       cursor: 'pointer',
//       borderColor: '#F9FAFC',
//       colors: graphColors,
//     },
//   },
//   legend: {
//     enabled: true,
//     layout: 'vertical',
//     backgroundColor: '#FFFFFF',
//     floating: true,
//     align: 'right',
//     verticalAlign: 'top',
//   },
// };

interface Props {
  data: KeywordDatabaseAggSummary;
}

const KeywordDistribution = (props: Props) => {
  const { data } = props;
  const showFormattedNumber = (stat: number) => {
    return showNAIfZeroOrNull(stat, formatNumber(stat));
  };
  // const pieChartOptions = merge(cloneDeep(chartOptions), {
  //   series: [
  //     {
  //       type: 'pie',
  //       innerSize: '60%',
  //       animation: false,
  //       name: 'name',
  //       colorByPoint: true,
  //       data:
  //         data &&
  //         Object.entries(data).map(dataPoint => {
  //           return {
  //             name: dataPoint[0],
  //             y: dataPoint[1],
  //           };
  //         }),
  //     },
  //   ],
  // });

  return (
    <div className={styles.distributionStats}>
      <div className={styles.statsRow}>
        <p className={styles.statsName} />
        <p className={styles.min}> Min </p>
        <p className={styles.avg}> Average </p>
        <p className={styles.max}> Max </p>
      </div>
      <div className={styles.statsRow}>
        <p className={styles.statsName}> Search Volume </p>
        <p className={styles.statsNumber}> - </p>
        <p className={styles.statsNumber}> {showFormattedNumber(data.avg_search_volume)}</p>
        <p className={styles.statsNumber}> - </p>
      </div>
      <div className={styles.statsRow}>
        <p className={styles.statsName}> Competing products </p>
        <p className={styles.statsNumber}> - </p>
        <p className={styles.statsNumber}> {showFormattedNumber(data.avg_competing_products)}</p>
        <p className={styles.statsNumber}> - </p>
      </div>
    </div>
  );
};

export default memo(KeywordDistribution);
