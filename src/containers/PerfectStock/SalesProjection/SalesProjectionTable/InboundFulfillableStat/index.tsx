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
        <p className={styles.statLabel}>Fulfilled</p>
        <p className={styles.stat}>{rowData.fulfillable_fba || '-'}</p>
        <p className={styles.statLabel}>Inbound</p>
        <p className={styles.stat}>{rowData.inbound_fba || '-'}</p>
      </div>
    </Table.Cell>
  );
};

export default InboundFulfillableStat;
