import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import SellerDatabaseFilters from './DatabaseFilters';

/* Components */
import EmptyFilterMessage from '../../../components/EmptyFilterMessage';

/* Selectors */
import { getIsFilterEmptyMessage } from '../../../selectors/SellerResearch/SellerDatabase';

interface Props {
  showEmptyFilterMessage: { show: boolean; message: string };
}

const SellerDatabase = (props: Props) => {
  const { showEmptyFilterMessage } = props;

  return (
    <main className={styles.sellerDatbasePage}>
      <SellerDatabaseFilters />
      <EmptyFilterMessage
        active={showEmptyFilterMessage.show}
        message={showEmptyFilterMessage.message}
        className={styles.filterMessage}
      />
    </main>
  );
};

const mapStateToProps = (state: any) => {
  return {
    showEmptyFilterMessage: getIsFilterEmptyMessage(state),
  };
};

export default connect(mapStateToProps)(SellerDatabase);
