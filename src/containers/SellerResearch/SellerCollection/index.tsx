import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from '../SellerDatabase/index.module.scss';

/* Containers */
import SellerDatabaseTable from '../SellerDatabase/DatabaseTable';

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

const SellerCollection = (props: Props) => {
  const { fetchSellerDatabase } = props;

  React.useEffect(() => {
    fetchSellerDatabase({ filterPayload: { isLookedUp: true } });
  }, []);

  return (
    <main className={styles.sellerDatbasePage}>
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
export default connect(mapStateToProps, mapDispatchToProps)(SellerCollection);
