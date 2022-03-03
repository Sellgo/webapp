import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { formatNumber } from '../../../../../utils/format';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';

const InboundFulfillableStat = (props: RowCell) => {
  const { rowData } = props;

  return (
    <Table.Cell {...props}>
      <div className={styles.inboundFulfillableStat}>
        <div className={styles.statWrapper}>
          <p className={styles.statLabel}>Fulfillable</p>
          <p className={styles.stat}>{formatNumber(rowData.fulfillable_fba) || '-'}</p>
        </div>
        <div className={styles.statWrapper}>
          <p className={styles.statLabel}>Transfer</p>
          <p className={styles.stat}>{formatNumber(rowData.transfer_fba) || '-'}</p>
        </div>
        <div className={styles.statWrapper}>
          <p className={styles.statLabel}>Reserved</p>
          <p className={styles.stat}>{formatNumber(rowData.reserved_fba) || '-'}</p>
        </div>
        <div className={styles.statWrapper}>
          <p className={styles.statLabel}>Unfulfillable</p>
          <p className={styles.stat}>{formatNumber(rowData.unfulfillable_fba) || '-'}</p>
        </div>
      </div>
    </Table.Cell>
  );
};

export default InboundFulfillableStat;
