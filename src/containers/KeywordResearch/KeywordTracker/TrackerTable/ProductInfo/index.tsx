import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';

const ProductInfo = (props: RowCell) => {
  return (
    <Table.Cell {...props}>
      <div className={styles.productInfoContainer}>
        <p>Product Info</p>
      </div>
    </Table.Cell>
  );
};

export default ProductInfo;
