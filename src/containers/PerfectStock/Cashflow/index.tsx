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
import { SellerSubscription } from '../../../interfaces/Seller';

/* Selectors */
import {
  getCashflowOnboardingStatus,
  getIsLoadingMainChart,
  getIsLoadingSubCharts,
  getMainChart,
  getSubCharts,
  getSubChartSettings,
} from '../../../selectors/PerfectStock/Cashflow';
import { getSellerSubscription } from '../../../selectors/Subscription';

/* Styles */
import styles from './index.module.scss';

/* Containers */
import TopGraph from './TopGraph';
import SubChart from './SubChart';
import ChartSettings from './ChartSettings';
import NotificationBanner from '../../../components/NotificationBanner';
import OnboardingModal from './OnboardingModal';

/* Constants */
import { ONBOARDING_STATUS_MAPPING } from '../../../constants/PerfectStock/Cashflow';

/* Assets */
import { ReactComponent as RedCross } from '../../../assets/images/redCrossCircle.svg';
import history from '../../../history';

/* Utils */
import { isSubscriptionIdFreeTrial } from '../../../utils/subscriptions';

interface Props {
  subChartSettings: SubChartSettings;
  subChartLoading: boolean;
  mainChartLoading: boolean;
  subCharts: Chart[];
  mainChart: Chart;
  onboardingStatus: any[];
  sellerSubscription: SellerSubscription;

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
    sellerSubscription,
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

  const isOrderPlanningSetUp = onboardingStatus?.find(
    (cost: any) => cost.is_completed && cost.step_name === 'orders_created'
  );

  const redirectToOrderPlanning = () => {
    history.push('/aistock/order');
  };

  const redirectToTpl = () => {
    history.push('/aistock/tpl');
  };

  const isTplSetUp = onboardingStatus?.find(
    (cost: any) => cost.is_completed && cost.step_name === 'tpl_storage_fee'
  );

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
      {!isOrderPlanningSetUp && (
        <NotificationBanner isOpenByDefault onClick={redirectToOrderPlanning}>
          <div className={styles.notificationBannerContent}>
            <RedCross />
            &nbsp;
            <span>Order Planning</span>&nbsp;has not been completed yet, create an order now.
          </div>
        </NotificationBanner>
      )}
      {!isTplSetUp && (
        <NotificationBanner isOpenByDefault onClick={redirectToTpl}>
          <div className={styles.notificationBannerContent}>
            <RedCross />
            &nbsp;
            <span>TPL Storage Costs</span>&nbsp;have not been completed yet, set up TPL now.
          </div>
        </NotificationBanner>
      )}
      <ChartSettings />
      <br />
      <div className={styles.subChartsWrapper}>
        {subCharts.map((item: Chart, index: number) => {
          const name = item?.data[0]?.name;
          let isFreeTrial = false;
          if (
            isSubscriptionIdFreeTrial(sellerSubscription?.subscription_id) &&
            (name === 'mid_payments' || name === 'paid_full' || name === 'deposits')
          ) {
            isFreeTrial = true;
          }
          return (
            <SubChart
              key={index}
              index={index}
              graphs={item.data}
              total={item.total}
              isFreeTrial={isFreeTrial}
              isLoading={subChartLoading}
            />
          );
        })}
      </div>

      <Modal
        open={isOnboardingModalOpen}
        className={styles.onboardingModal}
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
    sellerSubscription: getSellerSubscription(state),
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
