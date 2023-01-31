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
import SellgoGreetingVideoSection from '../../NewSellgoSubscription/VideoSection';

interface Props {
  fetchSellerDatabase: (payload: SellerDatabasePayload) => void;
  showFilterMessage: ShowFilterMessage;
}

const SellerDatabase = (props: Props) => {
  const { showFilterMessage, fetchSellerDatabase } = props;
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  React.useEffect(() => {
    fetchSellerDatabase({ retrieve_default: true });
  }, []);

  React.useEffect(() => {
    const skippedVideo = window.localStorage.getItem('skippedSellgoGreetingVideo');

    if (skippedVideo) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
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
      {isModalOpen && <SellgoGreetingVideoSection setIsModalOpen={setIsModalOpen} />}
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
