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
import {
  SellerDatabasePayload,
  ShowFilterMessage,
} from '../../../interfaces/SellerResearch/SellerDatabase';

/* ACtions */
import { fetchSellerDatabase } from '../../../actions/SellerResearch/SellerDatabase';

interface Props {
  fetchSellerDatabase: (payload: SellerDatabasePayload) => void;
  showFilterMessage: ShowFilterMessage;
}

const SellerDatabase = (props: Props) => {
  const { showFilterMessage, fetchSellerDatabase } = props;

  React.useEffect(() => {
    fetchSellerDatabase({ retrieve_default: true });
  }, []);

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

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellerDatabase: (payload: SellerDatabasePayload) => dispatch(fetchSellerDatabase(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SellerDatabase);
