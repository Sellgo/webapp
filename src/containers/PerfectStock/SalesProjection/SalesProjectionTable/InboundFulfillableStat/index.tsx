import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';

const InboundFulfillableStat = (props: RowCell) => {
  const { rowData } = props;

  return (
    <Table.Cell {...props}>
      <div className={styles.inboundFulfillableStat}>
        <div className={styles.statWrapper}>
          <p className={styles.statLabel}>Fulfillable</p>
          <p className={styles.stat}>{rowData.fulfillable_fba || '-'}</p>
        </div>
        <div className={styles.statWrapper}>
          <p className={styles.statLabel}>Inbound</p>
          <p className={styles.stat}>{rowData.transfer_fba || '-'}</p>
        </div>
        <div className={styles.statWrapper}>
          <p className={styles.statLabel}>Reserved</p>
          <p className={styles.stat}>{rowData.reserved_fba || '-'}</p>
        </div>
        <div className={styles.statWrapper}>
          <p className={styles.statLabel}>Unfulfillable</p>
          <p className={styles.stat}>{rowData.unfulfillable_fba || '-'}</p>
        </div>
      </div>
    </Table.Cell>
  );
};

export default InboundFulfillableStat;
