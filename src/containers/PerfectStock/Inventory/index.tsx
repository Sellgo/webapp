import React from 'react';
import { connect } from 'react-redux';
import JoyRide from 'react-joyride';

/* Actions */
import { fetchRefreshProgress } from '../../../actions/PerfectStock/OrderPlanning';
import { updatePerfectStockGetStartedJoyRideStatus } from '../../../actions/UserOnboarding';

/* Selectors */
import {
  getIsFetchingProgressForRefresh,
  getRefreshProgress,
} from '../../../selectors/PerfectStock/OrderPlanning';
import { getPerfectStockGetStartedJoyRideStatus } from '../../../selectors/UserOnboarding';

/* Components */
import ProgressBar from '../../../components/ProgressBar';
import InventoryTable from './InventoryTable';
import OrderGanttChart from './OrderGanttChart';
import OrderPlanningMeta from './OrderPlanningMeta';
import { PerfectStockGetStartedJoyRideStatus } from '../../../interfaces/UserOnboarding';

interface Props {
  isFetchingProgressForRefresh: boolean;
  fetchRefreshProgress: () => void;
  refreshProgress: number;
  perfectStockGetStartedJoyRideStatus: PerfectStockGetStartedJoyRideStatus;
  updatePerfectStockGetStartedJoyRideStatus: (key: string, status: boolean) => void;
}

const steps = [
  {
    target: '.HeaderSortCell_headerCell__alignMiddle__3X7he',
    content: 'Days until stockout',
    disableBeacon: true,
  },
  {
    target: '.OrderPlanningMeta_createOrderButton__2PKw2',
    content: 'The first step to your reordering needs',
    disableBeacon: true,
  },
  {
    target: '.timeLine',
    content: 'Streamline Gantt chart',
    disableBeacon: true,
  },
];

const OrderPlanning = (props: Props) => {
  const {
    isFetchingProgressForRefresh,
    refreshProgress,
    fetchRefreshProgress,
    perfectStockGetStartedJoyRideStatus,
    updatePerfectStockGetStartedJoyRideStatus,
  } = props;

  const [tableViewMode, setTableViewMode] = React.useState<'Inventory' | 'Stockout' | 'Today'>(
    'Inventory'
  );

  return (
    <main>
      <OrderGanttChart />
      <OrderPlanningMeta tableViewMode={tableViewMode} setTableViewMode={setTableViewMode} />
      <InventoryTable tableViewMode={tableViewMode} />
      <ProgressBar
        fetchProgress={fetchRefreshProgress}
        progress={refreshProgress}
        shouldFetchProgress={isFetchingProgressForRefresh}
      />

      <JoyRide
        steps={steps}
        run={perfectStockGetStartedJoyRideStatus.isOrderPlanningTourRunning}
        continuous={true}
        showProgress={true}
        callback={(data: any) => {
          if (data.action === 'close' || data.action === 'reset') {
            updatePerfectStockGetStartedJoyRideStatus('isOrderPlanningTourRunning', false);
          }
        }}
        styles={{
          options: {
            primaryColor: '#000',
            zIndex: 100000000000,
          },
        }}
        scrollToFirstStep={false}
        disableScrolling={true}
        disableCloseOnEsc={true}
      />
    </main>
  );
};

const mapStateToProps = (state: any) => ({
  refreshProgress: getRefreshProgress(state),
  isFetchingProgressForRefresh: getIsFetchingProgressForRefresh(state),
  perfectStockGetStartedJoyRideStatus: getPerfectStockGetStartedJoyRideStatus(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchRefreshProgress: () => dispatch(fetchRefreshProgress()),
    updatePerfectStockGetStartedJoyRideStatus: (key: string, status: boolean) =>
      dispatch(updatePerfectStockGetStartedJoyRideStatus(key, status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPlanning);
