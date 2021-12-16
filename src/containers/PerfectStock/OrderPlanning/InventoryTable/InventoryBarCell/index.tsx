import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';

/* Components */
import InventoryBar from '../../../../../components/InventoryBar';

/* Utils */
import { formatNumber, showNAIfZeroOrNull } from '../../../../../utils/format';

const InventoryBarCell = (props: RowCell) => {
  const { rowData, dataKey } = props;

  const percent = rowData[`${dataKey}_percent`];
  const inventoryCount = rowData[`${dataKey}_count`];

  const displayInventoryCount = showNAIfZeroOrNull(inventoryCount, formatNumber(inventoryCount));
  const displayPercent = showNAIfZeroOrNull(percent, `${formatNumber(percent * 100)}%`);

  return (
    <Table.Cell {...props}>
      <div
        className={`
          ${styles.inventoryBarCell}`}
      >
        <span style={percent <= 0.25 ? { color: '#EB675E' } : {}}>{displayPercent}</span>
        <span> {displayInventoryCount} </span>
        <InventoryBar percent={percent} />
      </div>
    </Table.Cell>
  );
};

export default InventoryBarCell;
