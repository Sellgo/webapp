import React from 'react';
import { connect } from 'react-redux';

/* Actions */
import {
  fetchSalesProjection,
  fetchRefreshProgress,
} from '../../../actions/PerfectStock/SalesProjection';
import { updatePerfectStockGetStartedStatus } from '../../../actions/UserOnboarding';

/* Interfaces */
import { SalesProjectionPayload } from '../../../interfaces/PerfectStock/SalesProjection';
import { PerfectStockGetStartedStatus } from '../../../interfaces/UserOnboarding';

/* Selectors */
import {
  getIsFetchingProgressForRefresh,
  getRefreshProgress,
} from '../../../selectors/PerfectStock/SalesProjection';
import { getPerfectStockGetStartedStatus } from '../../../selectors/UserOnboarding';

/* Containers */
import SalesProjectionMeta from './SalesProjectionMeta';
import SalesProjectionTable from './SalesProjectionTable';
import ProgressBar from '../../../components/ProgressBar';

interface Props {
  updatePerfectStockGetStartedStatus: (key: string, status: boolean) => void;
  perfectStockGetStartedStatus: PerfectStockGetStartedStatus;
  fetchSalesProjection: (payload: SalesProjectionPayload) => void;
  refreshProgress: number;
  isFetchingProgressForRefresh: boolean;
  fetchRefreshProgress: () => void;
}

const TPL = (props: Props) => {
  const {
    fetchSalesProjection,
    fetchRefreshProgress,
    refreshProgress,
    isFetchingProgressForRefresh,
  } = props;

  React.useEffect(() => {
    fetchSalesProjection({});
  }, []);

  return (
    <main>
      <ProgressBar
        fetchProgress={fetchRefreshProgress}
        progress={refreshProgress}
        shouldFetchProgress={isFetchingProgressForRefresh}
      />
      <SalesProjectionMeta />
      <SalesProjectionTable />
    </main>
  );
};

const mapStateToProps = (state: any) => {
  return {
    refreshProgress: getRefreshProgress(state),
    isFetchingProgressForRefresh: getIsFetchingProgressForRefresh(state),
    perfectStockGetStartedStatus: getPerfectStockGetStartedStatus(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSalesProjection: (payload: SalesProjectionPayload) =>
      dispatch(fetchSalesProjection(payload)),
    fetchRefreshProgress: () => dispatch(fetchRefreshProgress()),
    updatePerfectStockGetStartedStatus: (key: string, status: boolean) =>
      dispatch(updatePerfectStockGetStartedStatus(key, status)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TPL);
