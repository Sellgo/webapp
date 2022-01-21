import React from 'react';
import { connect } from 'react-redux';

/* Actions */
import { fetchRefreshProgress } from '../../../actions/PerfectStock/OrderPlanning';

/* Selectors */
import {
  getIsFetchingProgressForRefresh,
  getRefreshProgress,
} from '../../../selectors/PerfectStock/OrderPlanning';

/* Components */
import ProgressBar from '../../../components/ProgressBar';
import OrderGanttChart from '../Inventory/OrderGanttChart';
import OrderPlanningMeta from './OrderPlanningMeta';
import OrderSummary from './OrderSummary';
import OrderProducts from './OrderProducts';
import ExpectedDaysOfInventoryTable from './ExpectedDaysOfInventoryTable';

interface Props {
  isFetchingProgressForRefresh: boolean;
  fetchRefreshProgress: () => void;
  refreshProgress: number;
}

const OrderPlanning = (props: Props) => {
  const { isFetchingProgressForRefresh, refreshProgress, fetchRefreshProgress } = props;
  return (
    <main>
      <OrderGanttChart />
      <OrderSummary />
      <ExpectedDaysOfInventoryTable />
      <OrderPlanningMeta />
      <OrderProducts />
      <ProgressBar
        fetchProgress={fetchRefreshProgress}
        progress={refreshProgress}
        shouldFetchProgress={isFetchingProgressForRefresh}
      />
    </main>
  );
};

const mapStateToProps = (state: any) => ({
  refreshProgress: getRefreshProgress(state),
  isFetchingProgressForRefresh: getIsFetchingProgressForRefresh(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchRefreshProgress: () => dispatch(fetchRefreshProgress()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPlanning);
