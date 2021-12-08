import React from 'react';
import { connect } from 'react-redux';

/* Actions */
import { fetchSalesProjection } from '../../../actions/PerfectStock/SalesProjection';

/* Interfaces */
import { SalesProjectionPayload } from '../../../interfaces/PerfectStock/SalesProjection';

/* Containers */
import SalesProjectionMeta from './SalesProjectionMeta';
import SalesProjectionTable from './SalesProjectionTable';

interface Props {
  fetchSalesProjection: (payload: SalesProjectionPayload) => void;
}

const SalesProjection = (props: Props) => {
  const { fetchSalesProjection } = props;

  React.useEffect(() => {
    fetchSalesProjection({});
  }, []);

  return (
    <main>
      <SalesProjectionMeta />
      <SalesProjectionTable />
    </main>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSalesProjection: (payload: SalesProjectionPayload) =>
      dispatch(fetchSalesProjection(payload)),
  };
};
export default connect(null, mapDispatchToProps)(SalesProjection);
