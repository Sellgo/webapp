import React, { useEffect } from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Selectors */
import {
  getCentralScrapingProgress,
  getShowCentralScrapingProgress,
} from '../../../../selectors/SellerResearch/SellerInventory';

/* Actions */
import { fetchCentralScrapingProgress } from '../../../../actions/SellerResearch/SellerInventory';

/* Components */
import FinderProgressDetails from '../../../../components/FinderProgressDetails';

/* Interfaces */
import { CentralScrapingProgress } from '../../../../interfaces/SellerResearch/SellerInventory';

/* Hooks */
import { useInterval } from '../../../../hooks/useInterval';

interface Props {
  showCentralScrapingProgress: boolean;
  centralScrapingProgress: CentralScrapingProgress[];
  fetchCentralScrapingProgress: () => void;
}

const InventoryProgressBox = (props: Props) => {
  const {
    fetchCentralScrapingProgress,
    showCentralScrapingProgress,
    centralScrapingProgress,
  } = props;

  useEffect(() => {
    fetchCentralScrapingProgress();
  }, []);

  useInterval(() => {
    if (showCentralScrapingProgress) {
      fetchCentralScrapingProgress();
      return;
    }
    return;
  }, 5000);

  return (
    <div className={styles.inventoryProgressBox}>
      {centralScrapingProgress &&
        centralScrapingProgress.map((pdetails: CentralScrapingProgress) => {
          return <FinderProgressDetails key={pdetails.job_id} processDetails={pdetails} />;
        })}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    showCentralScrapingProgress: getShowCentralScrapingProgress(state),
    centralScrapingProgress: getCentralScrapingProgress(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchCentralScrapingProgress: () => dispatch(fetchCentralScrapingProgress()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryProgressBox);
