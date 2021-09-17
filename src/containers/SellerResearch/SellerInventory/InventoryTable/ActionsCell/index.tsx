import React from 'react';
import { Table } from 'rsuite';
import { Icon, Popup } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';

const ActionsCell = (props: RowCell) => {
  const { rowData } = props;

  const merchantId = rowData.merchant_id;
  const sellerLink = `https://www.amazon.com/sp?seller=${merchantId}`;

  const handleViewOnAmazon = () => {
    window.open(sellerLink, '_blank');
  };

  const handleRefresh = () => {
    console.log('Handle Refresh');
  };

  const handleDelete = () => {
    console.log('Delete Seller');
  };

  return (
    <Table.Cell {...props}>
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
                Delete Product
              </button>
            </div>
          }
        />
      </div>
    </Table.Cell>
  );
};

export default ActionsCell;
