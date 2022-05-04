import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';

/* Actions */
import {
  fetchSubCharts,
  fetchTopGraph,
  fetchCashflowOnboardingStatus,
} from '../../../actions/PerfectStock/Home';

/* Interfaces */
import { Chart, SubChartSettings } from '../../../interfaces/PerfectStock/Home';

/* Selectors */
import {
  getCashflowOnboardingStatus,
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
import NotificationBanner from '../../../components/NotificationBanner';
import OnboardingModal from './OnboardingModal';

/* Constants */
import { ONBOARDING_STATUS_MAPPING } from '../../../constants/PerfectStock/Home';

/* Assets */
import { ReactComponent as RedCross } from '../../../assets/images/redCrossCircle.svg';

interface Props {
  subChartSettings: SubChartSettings;
  subChartLoading: boolean;
  mainChartLoading: boolean;
  subCharts: Chart[];
  mainChart: Chart;
  onboardingStatus: any[];

  fetchMainChart: (granularity?: number) => void;
  fetchSubCharts: () => void;
  fetchCashflowOnboardingStatus: () => void;
}

const Home = (props: Props) => {
  const {
    mainChart,
    mainChartLoading,
    subCharts,
    subChartLoading,
    onboardingStatus,
    fetchMainChart,
    fetchSubCharts,
    fetchCashflowOnboardingStatus,
  } = props;

  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = React.useState(false);

  React.useEffect(() => {
    fetchMainChart();
    fetchSubCharts();
    fetchCashflowOnboardingStatus();
  }, []);

  const numOfCostsNotSetUp = onboardingStatus?.filter(
    (cost: any) => !cost.is_completed && ONBOARDING_STATUS_MAPPING[cost.step_name]
  )?.length;

  return (
    <main>
      <TopGraph
        data={mainChart.data}
        isLoading={mainChartLoading}
        fetchMainChart={fetchMainChart}
      />
      {numOfCostsNotSetUp !== undefined && numOfCostsNotSetUp > 0 && (
        <NotificationBanner isOpenByDefault onClick={() => setIsOnboardingModalOpen(true)}>
          <div className={styles.notificationBannerContent}>
            <RedCross />
            &nbsp;
            <span>{numOfCostsNotSetUp} COSTS</span>&nbsp;have not been completed yet, set up now.
          </div>
        </NotificationBanner>
      )}
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

      {/* Add Competitors Modal */}
      <Modal
        open={isOnboardingModalOpen}
        className={styles.addCompetitorsModal}
        onClose={() => setIsOnboardingModalOpen(false)}
        content={
          <OnboardingModal
            onboardingStatus={onboardingStatus}
            closeModal={() => {
              setIsOnboardingModalOpen(false);
            }}
          />
        }
      />
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
    onboardingStatus: getCashflowOnboardingStatus(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchMainChart: (granularity?: number) => dispatch(fetchTopGraph(granularity)),
    fetchSubCharts: () => dispatch(fetchSubCharts()),
    fetchCashflowOnboardingStatus: () => dispatch(fetchCashflowOnboardingStatus()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
