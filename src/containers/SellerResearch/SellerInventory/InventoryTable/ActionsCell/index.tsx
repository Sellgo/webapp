import React from 'react';
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

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';
import { DeleteSellerPayload } from '../../../../../interfaces/SellerResearch/SellerInventory';

/* Hooks */
import { useFindRefreshSeller } from '../../SocketProviders/FindRefreshSeller';

interface Props extends RowCell {
  deleteSellerFromTable: (payload: DeleteSellerPayload) => void;
  fetchCentralScrapingProgress: () => void;
}

const ActionsCell = (props: Props) => {
  const { deleteSellerFromTable, fetchCentralScrapingProgress, ...otherProps } = props;

  const { handleFindOrRefresh } = useFindRefreshSeller();

  const { rowData } = otherProps;

  const merchantId = rowData.merchant_id;
  const id = rowData.id;
  const sellerLink = `https://www.amazon.com/sp?seller=${merchantId}`;

  const handleViewOnAmazon = () => {
    window.open(sellerLink, '_blank');
  };

  /* Refresh seller from table */
  const handleRefresh = () => {
    handleFindOrRefresh({
      type: 'refresh',
      merchantIds: merchantId,
    });
    fetchCentralScrapingProgress();
  };

  /* Delete seller from table */
  const handleDelete = () => {
    deleteSellerFromTable({ id });
  };

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.actionCellWrapper}>
        <Popup
          className={styles.actionCellPopup}
          trigger={<Icon name="ellipsis vertical" className={styles.actionCellTrigger} />}
          on="click"
          position="bottom right"
          offset="-15"
          content={
            <div className={styles.actionCellContent}>
              <button onClick={handleViewOnAmazon}>
                <Icon name="amazon" className={styles.actionCellIcon} />
                View on Amazon
              </button>

              <button onClick={handleRefresh}>
                <Icon name="refresh" className={styles.actionCellIcon} />
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteSellerFromTable: (payload: DeleteSellerPayload) =>
      dispatch(deleteSellerFromTable(payload)),
    fetchCentralScrapingProgress: () => dispatch(fetchCentralScrapingProgress()),
  };
};

export default connect(null, mapDispatchToProps)(ActionsCell);
