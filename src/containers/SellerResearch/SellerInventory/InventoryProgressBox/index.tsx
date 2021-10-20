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

/* Utils */
import { truncateString } from '../../../../utils/format';

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
          return (
            <div className={styles.progressDetails} key={pdetails.job_id}>
              {/* Type of progress */}
              <span className={styles.progressType}>Check Sellers</span>

              {/* Additional Product Details */}
              <span className={styles.productDetails}>
                {truncateString(pdetails.name ? pdetails.name : 'Processing......', 45)}
              </span>

              {/* Seller/Product ASIN/ID */}
              <span className={styles.infoId}>{pdetails.parameter ? pdetails.parameter : '-'}</span>

              {/* Progress Icon */}
              <span className={styles.progressIcon}>✅</span>

              {/* Progress Status */}
              <span className={styles.progressStatus}>Completed</span>
            </div>
          );
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
