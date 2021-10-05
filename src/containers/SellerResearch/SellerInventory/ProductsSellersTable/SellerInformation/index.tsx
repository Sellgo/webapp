import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';

const SellerInformation = (props: RowCell) => {
  const { rowData } = props;

  const merchantName = rowData.merchant_name;

  return (
    <Table.Cell {...props}>
      <div className={styles.sellerInformation}>
        <p className={styles.sellerName}>{merchantName}</p>
      </div>
    </Table.Cell>
  );
};

export default SellerInformation;
