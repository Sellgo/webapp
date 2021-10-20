import React, { useEffect, useState } from 'react';
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
import { Icon } from 'semantic-ui-react';

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

  const [minizedProgress, setMinimizeProgress] = useState(false);

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

  const firstProgress = centralScrapingProgress && centralScrapingProgress[0];

  const arePendingProgress = centralScrapingProgress && centralScrapingProgress.length > 0;

  return (
    <>
      {minizedProgress && arePendingProgress && (
        <button className={styles.inventorySummarybtn} onClick={() => setMinimizeProgress(false)}>
          <Icon loading name="spinner" />
          {`${firstProgress && firstProgress.progress} %`}
        </button>
      )}

      {!minizedProgress && arePendingProgress && (
        <div className={styles.inventoryProgressBox}>
          <Icon
            name="close"
            className={styles.minimizeBtn}
            onClick={() => setMinimizeProgress(true)}
          />

          <div>
            {/* Minimize the progress */}

            {centralScrapingProgress &&
              centralScrapingProgress.map((pdetails: CentralScrapingProgress) => {
                return <FinderProgressDetails key={pdetails.job_id} processDetails={pdetails} />;
              })}
          </div>
        </div>
      )}
    </>
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
