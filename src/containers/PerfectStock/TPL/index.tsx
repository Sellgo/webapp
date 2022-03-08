import React from 'react';
import { connect } from 'react-redux';

/* Actions */
import { fetchRefreshProgress } from '../../../actions/PerfectStock/SalesProjection';
import { updatePerfectStockGetStartedStatus } from '../../../actions/UserOnboarding';
import { fetchTpl } from '../../../actions/PerfectStock/Tpl';

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
import TplTable from './TplTable';
import TplSettings from './TplSettings';
import ProgressBar from '../../../components/ProgressBar';

interface Props {
  updatePerfectStockGetStartedStatus: (key: string, status: boolean) => void;
  perfectStockGetStartedStatus: PerfectStockGetStartedStatus;
  fetchTpl: (payload: SalesProjectionPayload) => void;
  refreshProgress: number;
  isFetchingProgressForRefresh: boolean;
  fetchRefreshProgress: () => void;
}

const TPL = (props: Props) => {
  const { fetchTpl, fetchRefreshProgress, refreshProgress, isFetchingProgressForRefresh } = props;

  React.useEffect(() => {
    fetchTpl({});
  }, []);

  return (
    <main>
      <ProgressBar
        fetchProgress={fetchRefreshProgress}
        progress={refreshProgress}
        shouldFetchProgress={isFetchingProgressForRefresh}
      />
      <TplSettings />
      <SalesProjectionMeta />
      <TplTable />
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
    fetchTpl: (payload: SalesProjectionPayload) => dispatch(fetchTpl(payload)),
    fetchRefreshProgress: () => dispatch(fetchRefreshProgress()),
    updatePerfectStockGetStartedStatus: (key: string, status: boolean) =>
      dispatch(updatePerfectStockGetStartedStatus(key, status)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TPL);
