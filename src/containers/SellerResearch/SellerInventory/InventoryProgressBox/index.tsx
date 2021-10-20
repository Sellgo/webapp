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
  const { fetchCentralScrapingProgress, showCentralScrapingProgress } = props;

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
      <div className={styles.progressDetails}>
        {/* Type of progress */}
        <span className={styles.progressType}>Check Sellers</span>

        {/* Additional Product Details */}
        <span className={styles.productDetails}>
          {truncateString('Big thermos water bottle Insulated with steel… (50 chars)', 50)}
        </span>

        {/* Seller/Product ASIN/ID */}
        <span className={styles.infoId}>AU12349G1</span>

        {/* Progress Icon */}
        <span className={styles.progressIcon}>✅</span>

        {/* Progress Status */}
        <span className={styles.progressStatus}>Completed</span>
      </div>
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
