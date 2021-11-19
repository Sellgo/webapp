import React, { useState } from 'react';
import { Table } from 'rsuite';
import { Popup, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Selectors */
import {
  getAllowLiveScraping,
  getSellerInventoryTableExpandedRow,
} from '../../../../../selectors/SellerResearch/SellerInventory';

/* Utils */
import { formatNumber, showNAIfZeroOrNull } from '../../../../../utils/format';
import { isLessThan24Hours } from '../../../../../utils/date';

/* Assets */
import { ReactComponent as CheckSellerIcon } from '../../../../../assets/images/userUnlockedIcon.svg';

/* Actions */
import { fetchCentralScrapingProgress } from '../../../../../actions/SellerResearch/SellerInventory';

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';

/* Hooks */
import { useFindRefreshSellerByAsin } from '../../SocketProviders/FindRefreshSellerByAsin';
import { success } from '../../../../../utils/notifications';
import { timeout } from '../../../../../utils/timeout';

interface Props extends RowCell {
  allowLiveScraping: boolean;
  sellerInventoryExpandedTableRow: any;
  fetchCentralScrapingProgress: () => void;
}

const BuyboxCompetition = (props: Props) => {
  const {
    allowLiveScraping,
    sellerInventoryExpandedTableRow,
    fetchCentralScrapingProgress,
    ...otherProps
  } = props;

  const [openPopup, setOpenPopup] = useState(false);

  const { handleFindOrRefreshByAsin } = useFindRefreshSellerByAsin();

  const { rowData } = otherProps;

  const numOfSellers = rowData.num_sellers ? formatNumber(rowData.num_sellers) : false;
  const productAsin = rowData.asin;
  const merchantId = rowData.merchant_id;

  const lastCheckSellers = rowData.last_check_sellers;

  /* Logic to disbale check inventory */
  const disableCheckSellers = isLessThan24Hours(lastCheckSellers) || !allowLiveScraping;

  /* Handle close popup */
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  /* Handle Check Sellers button */
  const handleCheckSellers = async () => {
    const sendPayload = {
      asins: productAsin,
      merchantId,
      //parentAsin true means it's a nested variant (means it has a parent asin as well)
      parentAsin: true,
      sellerInventoryTableExpandedRowId: sellerInventoryExpandedTableRow.id,
    };

    handleFindOrRefreshByAsin(sendPayload);
    handleClosePopup();
    success(`Checking sellers for ${productAsin}. Check the progress for latest updates`);
    await timeout(2000);
    await fetchCentralScrapingProgress();
  };

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.actionCellWrapper}>
        <div className={styles.actionCell}>
          <button
            className={styles.actionButton}
            onClick={handleCheckSellers}
            disabled={disableCheckSellers}
            style={{
              color: numOfSellers ? '#3b4557' : '#636d76',
              fontWeight: numOfSellers ? 500 : 400,
            }}
          >
            {showNAIfZeroOrNull(numOfSellers, numOfSellers)}
          </button>
          <Popup
            on="click"
            open={openPopup}
            onClose={handleClosePopup}
            position="bottom left"
            offset="-40"
            closeOnDocumentClick
            closeOnEscape
            className={styles.actionsPopover}
            trigger={
              <Button
                icon="chevron down"
                className={`${styles.iconButton} iconButtonResetGlobal`}
                onClick={() => setOpenPopup(true)}
              />
            }
            content={
              <>
                <div className={styles.actionOptions}>
                  <p>Buybox Competition</p>
                  <button onClick={handleCheckSellers} disabled={disableCheckSellers}>
                    <CheckSellerIcon />
                    <span>Check Sellers</span>
                  </button>
                </div>
              </>
            }
          />
        </div>
      </div>
    </Table.Cell>
  );
};

const mapStateToProps = (state: any) => {
  return {
    allowLiveScraping: getAllowLiveScraping(state),
    sellerInventoryExpandedTableRow: getSellerInventoryTableExpandedRow(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchCentralScrapingProgress: () => dispatch(fetchCentralScrapingProgress()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyboxCompetition);
