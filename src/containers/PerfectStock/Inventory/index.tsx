import React from 'react';
import { connect } from 'react-redux';
import JoyRide from 'react-joyride';

/* Actions */
import { fetchRefreshProgress } from '../../../actions/PerfectStock/OrderPlanning';
import { updatePerfectStockGetStartedStatus } from '../../../actions/UserOnboarding';

/* Selectors */
import {
  getIsFetchingProgressForRefresh,
  getRefreshProgress,
} from '../../../selectors/PerfectStock/OrderPlanning';
import { getPerfectStockGetStartedStatus } from '../../../selectors/UserOnboarding';

/* Components */
import ProgressBar from '../../../components/ProgressBar';
import InventoryTable from './InventoryTable';
import OrderGanttChart from './OrderGanttChart';
import OrderPlanningMeta from './OrderPlanningMeta';
import { PerfectStockGetStartedStatus } from '../../../interfaces/UserOnboarding';

interface Props {
  isFetchingProgressForRefresh: boolean;
  fetchRefreshProgress: () => void;
  refreshProgress: number;
  perfectStockGetStartedStatus: PerfectStockGetStartedStatus;
  updatePerfectStockGetStartedStatus: (key: string, status: boolean) => void;
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
    perfectStockGetStartedStatus,
    updatePerfectStockGetStartedStatus,
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
        run={perfectStockGetStartedStatus.isOrderPlanningTourRunning}
        continuous={true}
        showProgress={true}
        callback={(data: any) => {
          if (data.action === 'close' || data.action === 'reset') {
            updatePerfectStockGetStartedStatus('isOrderPlanningTourRunning', false);
          }
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
  perfectStockGetStartedStatus: getPerfectStockGetStartedStatus(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchRefreshProgress: () => dispatch(fetchRefreshProgress()),
    updatePerfectStockGetStartedStatus: (key: string, status: boolean) =>
      dispatch(updatePerfectStockGetStartedStatus(key, status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPlanning);
