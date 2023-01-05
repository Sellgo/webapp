import React, { memo } from 'react';
import { Table } from 'rsuite';

/* Styles */
import styles from './index.module.scss';

/* Types */
import { RowCell } from '../../../interfaces/Table';

/* Components */
import { getMarketplaceFlag } from '../../../constants/Settings';

interface Props extends RowCell {
  isMarketPlace?: boolean;
}

/* Row cell, Appends $ sign infront of monetary cells */
const ImageCell = (props: Props) => {
  const { rowData, dataKey, isMarketPlace } = props;
  const img = isMarketPlace ? getMarketplaceFlag(rowData[dataKey]) : rowData[dataKey];
  return (
    <Table.Cell {...props}>
      <div className={styles.imgCell}>
        <img src={img} alt="Marketplace Flags" />
      </div>
    </Table.Cell>
  );
};

export default memo(ImageCell);
