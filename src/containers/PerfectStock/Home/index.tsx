import React from 'react';
import { connect } from 'react-redux';

/* Actions */
import { fetchSubCharts, fetchTopGraph } from '../../../actions/PerfectStock/Home';

/* Interfaces */
import { Chart, SubChartSettings } from '../../../interfaces/PerfectStock/Home';

/* Selectors */
import {
  getIsLoadingMainChart,
  getIsLoadingSubCharts,
  getMainChart,
  getSubCharts,
  getSubChartSettings,
} from '../../../selectors/PerfectStock/Home';

/* Styles */
import styles from './index.module.scss';

/* Containers */
import TopGraph from './TopGraph';
import SubChart from './SubChart';
import ChartSettings from './ChartSettings';

interface Props {
  subChartSettings: SubChartSettings;
  subChartLoading: boolean;
  mainChartLoading: boolean;
  subCharts: Chart[];
  mainChart: Chart;

  fetchMainChart: () => void;
  fetchSubCharts: () => void;
}

const Home = (props: Props) => {
  const {
    mainChart,
    mainChartLoading,
    subCharts,
    subChartLoading,
    fetchMainChart,
    fetchSubCharts,
  } = props;
  React.useEffect(() => {
    fetchMainChart();
    fetchSubCharts();
  }, []);

  return (
    <main>
      <TopGraph data={mainChart.data} isLoading={mainChartLoading} />
      <ChartSettings />
      <br />
      <div className={styles.subChartsWrapper}>
        {subCharts.map((item: Chart, index: number) => {
          return (
            <SubChart
              key={index}
              index={index}
              graphs={item.data}
              total={item.total}
              isLoading={subChartLoading}
            />
          );
        })}
      </div>
    </main>
  );
};

const mapStateToProps = (state: any) => {
  return {
    mainChart: getMainChart(state),
    mainChartLoading: getIsLoadingMainChart(state),
    subChartLoading: getIsLoadingSubCharts(state),
    subChartSettings: getSubChartSettings(state),
    subCharts: getSubCharts(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchMainChart: () => dispatch(fetchTopGraph()),
    fetchSubCharts: () => dispatch(fetchSubCharts()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
