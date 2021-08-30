import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Dimmer, Icon, Loader } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';
import { truncateString } from '../../../../../utils/format';

interface Props {
  isLoadingChart: boolean;
  chartingData: any;
  phrase: string;
  closeChart?: () => void;
}

export const KeywordHistoryChart = (props: Props) => {
  const { isLoadingChart, chartingData, phrase, closeChart } = props;

  const formattedHistoryData =
    chartingData &&
    chartingData.map((data: any) => {
      return [new Date(data.udate).getTime(), data.position_rank];
    });

  const chartOptions = {
    chart: {
      zoomType: 'x',
    },
    title: {
      text: '',
      useHtml: true,
    },
    colors: ['#2f8ddf'],
    xAxis: {
      title: {
        text: '',
      },
      type: 'datetime',
      crosshair: {
        snap: false,
      },
      labels: {
        style: {
          color: '#ccc',
        },
      },
    },
    yAxis: {
      title: {
        text: 'Position Rank',
      },
      labels: {
        style: {
          color: '#ccc',
        },
      },
    },
    tooltip: {
      shared: true,
      followPointer: true,
      followTouchMove: true,
      stickOnContact: true,
    },
    legend: {
      enaabled: false,
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
    },
    series: [
      {
        step: true,
        name: '',
        label: {
          enabled: false,
        },
        data: formattedHistoryData,
      },
    ],
  };

  return (
    <div className={styles.keywordHistoryChartContainer}>
      <div className={styles.keywordHistoryChartHeader}>
        <img src={require('../../../../../assets/images/USFlag.png')} alt="American Flag" />
        <a href={`https://www.amazon.com/s?k=${phrase}`} target="_blank" rel="noreferrer noopener">
          <h2>{truncateString(phrase, 80)}</h2>
        </a>
        {closeChart && (
          <Icon
            name="close"
            className={styles.keywordHistoryChartHeader__closeButton}
            onClick={closeChart}
          />
        )}
      </div>

      {isLoadingChart ? (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      ) : (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      )}
    </div>
  );
};

export default KeywordHistoryChart;
