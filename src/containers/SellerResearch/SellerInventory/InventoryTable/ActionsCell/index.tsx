import React, { useState } from 'react';
import { Table } from 'rsuite';
import { Icon, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import {
  deleteSellerFromTable,
  fetchCentralScrapingProgress,
} from '../../../../../actions/SellerResearch/SellerInventory';

/* Utils */
import { timeout } from '../../../../../utils/timeout';
import { success } from '../../../../../utils/notifications';

/* Selectors */
import { getAllowLiveScraping } from '../../../../../selectors/SellerResearch/SellerInventory';

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';
import { DeleteSellerPayload } from '../../../../../interfaces/SellerResearch/SellerInventory';

/* Hooks */
import { useFindRefreshSeller } from '../../SocketProviders/FindRefreshSeller';
import TableIcon from '../../../../../components/Icons/TableIcon';

interface Props extends RowCell {
  allowLiveScraping: boolean;
  deleteSellerFromTable: (payload: DeleteSellerPayload) => void;
  fetchCentralScrapingProgress: () => void;
}

const ActionsCell = (props: Props) => {
  const {
    allowLiveScraping,
    deleteSellerFromTable,
    fetchCentralScrapingProgress,
    ...otherProps
  } = props;

  const [openPopup, setOpenPopup] = useState(false);

  const { handleFindOrRefresh } = useFindRefreshSeller();

  const { rowData } = otherProps;

  const merchantId = rowData.merchant_id;
  const id = rowData.id;
  const sellerLink = `https://www.amazon.com/sp?seller=${merchantId}`;

  /* Handle close popup */
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  /* View on Amazon */
  const handleViewOnAmazon = () => {
    window.open(sellerLink, '_blank');
    handleClosePopup();
  };

  /* Refresh seller from table */
  const handleRefresh = async () => {
    handleFindOrRefresh({
      type: 'refresh',
      merchantIds: merchantId,
    });
    handleClosePopup();
    success(`Refetching ${merchantId}. Check the progress for latest updates`);
    await timeout(2000);
    await fetchCentralScrapingProgress();
  };

  /* Delete seller from table */
  const handleDelete = () => {
    deleteSellerFromTable({ id });
    handleClosePopup();
  };

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.actionCellWrapper}>
        <Popup
          className={styles.actionCellPopup}
          trigger={
            <div className={styles.actionCellTrigger}>
              <TableIcon onClick={() => setOpenPopup(true)} name="ellipsis vertical" />
            </div>
          }
          on="click"
          open={openPopup}
          onClose={handleClosePopup}
          position="bottom right"
          offset="-15"
          content={
            <div className={styles.actionCellContent}>
              <button onClick={handleViewOnAmazon}>
                <Icon name="amazon" className={styles.actionCellIcon} />
                View on Amazon
              </button>

              <button onClick={handleRefresh}>
                <Icon
                  name="refresh"
                  className={styles.actionCellIcon}
                  disabled={!allowLiveScraping}
                />
                Refresh
              </button>

              <button onClick={handleDelete}>
                <Icon name="trash" className={styles.actionCellIcon} />
                Delete Seller
              </button>
            </div>
          }
        />
      </div>
    </Table.Cell>
  );
};

const mapStateToProps = (state: any) => {
  return {
    allowLiveScraping: getAllowLiveScraping(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteSellerFromTable: (payload: DeleteSellerPayload) =>
      dispatch(deleteSellerFromTable(payload)),
    fetchCentralScrapingProgress: () => dispatch(fetchCentralScrapingProgress()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionsCell);
