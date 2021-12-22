import React from 'react';
import { connect } from 'react-redux';

/* Actions */
import {
  fetchSalesProjection,
  fetchRefreshProgress,
} from '../../../actions/PerfectStock/SalesProjection';
import ProgressBar from '../../../components/ProgressBar';

/* Interfaces */
import { SalesProjectionPayload } from '../../../interfaces/PerfectStock/SalesProjection';

/* Selectors */
import {
  getIsFetchingProgressForRefresh,
  getRefreshProgress,
} from '../../../selectors/PerfectStock/SalesProjection';

/* Containers */
import SalesProjectionMeta from './SalesProjectionMeta';
import SalesProjectionTable from './SalesProjectionTable';

interface Props {
  fetchSalesProjection: (payload: SalesProjectionPayload) => void;
  refreshProgress: number;
  isFetchingProgressForRefresh: boolean;
  fetchRefreshProgress: () => void;
}

const SalesProjection = (props: Props) => {
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
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSalesProjection: (payload: SalesProjectionPayload) =>
      dispatch(fetchSalesProjection(payload)),
    fetchRefreshProgress: () => dispatch(fetchRefreshProgress()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SalesProjection);
