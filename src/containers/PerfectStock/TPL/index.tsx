import React from 'react';
import { connect } from 'react-redux';

/* Actions */
import { fetchRefreshProgress } from '../../../actions/PerfectStock/SalesProjection';
import { updatePerfectStockGetStartedStatus } from '../../../actions/UserOnboarding';
import { fetchTplVendors } from '../../../actions/PerfectStock/Tpl';

/* Interfaces */
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
  fetchTplVendors: () => void;
  refreshProgress: number;
  isFetchingProgressForRefresh: boolean;
  fetchRefreshProgress: () => void;
}

const TPL = (props: Props) => {
  const {
    fetchTplVendors,
    fetchRefreshProgress,
    refreshProgress,
    isFetchingProgressForRefresh,
  } = props;

  React.useEffect(() => {
    fetchTplVendors();
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
    fetchTplVendors: () => dispatch(fetchTplVendors()),
    fetchRefreshProgress: () => dispatch(fetchRefreshProgress()),
    updatePerfectStockGetStartedStatus: (key: string, status: boolean) =>
      dispatch(updatePerfectStockGetStartedStatus(key, status)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TPL);
