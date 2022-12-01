import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import SellerDatabaseTable from './DatabaseTable';
import DatabaseExport from './DatabaseExport';

/* Components */
import SellerMapFilter from '../SellerMaps/SellerMapFilter';

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
  const { fetchSellerDatabase } = props;

  React.useEffect(() => {
    fetchSellerDatabase({ retrieve_default: true });
  }, []);

  return (
    <main className={styles.sellerDatbasePage}>
      <section className={styles.sellerDataBaseContainer}>
        <SellerMapFilter showFilter={true} />
        <div className={styles.sellerDataBaseTableContainer}>
          <DatabaseExport />
          <SellerDatabaseTable />
        </div>
      </section>
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
