import React from 'react';
import { connect } from 'react-redux';

/* Actions */
import { fetchSubCharts, fetchTopGraph } from '../../../actions/PerfectStock/Home';

/* Interfaces */
import { Chart, SubChartSettings } from '../../../interfaces/PerfectStock/Home';

/* Selectors */
import {
  getMainChart,
  getSubCharts,
  getSubChartSettings,
} from '../../../selectors/PerfectStock/Home';

/* Containers */
import TopGraph from './TopGraph';
import SubChart from './SubChart';

interface Props {
  subChartSettings: SubChartSettings;
  subCharts: Chart[];
  mainChart: Chart;

  fetchMainChart: () => void;
  fetchSubCharts: () => void;
}

const Home = (props: Props) => {
  const { mainChart, subCharts, fetchMainChart, fetchSubCharts } = props;
  React.useEffect(() => {
    fetchMainChart();
    fetchSubCharts();
  }, []);

  return (
    <main>
      <TopGraph data={mainChart.data} />
      <p>Filters</p>
      <br />
      {subCharts.map((item: Chart, index: number) => {
        return <SubChart key={index} index={index} data={item.data} />;
      })}
    </main>
  );
};

const mapStateToProps = (state: any) => {
  return {
    mainChart: getMainChart(state),
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
