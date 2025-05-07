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
import JoyRideCustomTooltip from '../../../components/JoyRideCustomTooltip';

interface Props {
  isFetchingProgressForRefresh: boolean;
  fetchRefreshProgress: () => void;
  refreshProgress: number;
  perfectStockGetStartedJoyRideStatus: PerfectStockGetStartedJoyRideStatus;
  updatePerfectStockGetStartedJoyRideStatus: (key: string, status: boolean) => void;
}

const steps = [
  {
    target: '.HeaderSortCell_headerText__alignMiddle__3P4Sh',
    content:
      'Days until stock out shows total number of days of domestic inventory still in stock.',
    placement: 'bottom' as const,
    disableBeacon: true,
  },
  {
    target: '.OrderPlanningMeta_createOrderButton__2PKw2',
    content: 'The first step to your reordering needs, click here to start creating smart order.',
    placement: 'bottom' as const,
    disableBeacon: true,
  },
  {
    target: '.InputTabSelection_inputTabSelection__2ez_k',
    content:
      'Click here to change view of future inventory burnout or future stockout prediction or today inventory details.',
    disableBeacon: true,
  },
  {
    target: '.InventoryBarCell_inventoryBarCell__1_Vrh',
    content: 'Inventory burnout indicator.',
    disableBeacon: true,
  },
  {
    target: '.timeLine',
    content: 'Streamline Gantt chart details',
    disableBeacon: true,
  },
  {
    target: '.timeLine-edit-order',
    content: 'click here to edit order.',
    disableBeacon: true,
  },
  {
    target: '.NavigationButton_navigationButton__1_nZU',
    content: 'Click here to go to order planning setting',
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
        tooltipComponent={JoyRideCustomTooltip}
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
