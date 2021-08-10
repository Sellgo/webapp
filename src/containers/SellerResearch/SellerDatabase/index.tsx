import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import SellerDatabaseFilters from './DatabaseFilters';
import SellerDatabaseTable from './DatabaseTable';
import DatabaseExport from './DatabaseExport';

/* Components */
import FilterMessage from '../../../components/FilterMessage';

/* Selectors */
import { getFilterMessage } from '../../../selectors/SellerResearch/SellerDatabase';

/* Interfaces */
import { ShowFilterMessage } from '../../../interfaces/SellerResearch/SellerDatabase';

interface Props {
  showFilterMessage: ShowFilterMessage;
}

const SellerDatabase = (props: Props) => {
  const { showFilterMessage } = props;

  return (
    <main className={styles.sellerDatbasePage}>
      <SellerDatabaseFilters />
      <FilterMessage
        active={showFilterMessage.show}
        message={showFilterMessage.message}
        type={showFilterMessage.type}
        className={styles.filterMessage}
      />
      <DatabaseExport />
      <SellerDatabaseTable />
    </main>
  );
};

const mapStateToProps = (state: any) => {
  return {
    showFilterMessage: getFilterMessage(state),
  };
};

export default connect(mapStateToProps)(SellerDatabase);
