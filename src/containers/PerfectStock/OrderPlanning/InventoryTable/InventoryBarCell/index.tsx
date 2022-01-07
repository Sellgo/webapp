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

  const inventory = rowData[dataKey];
  let percent;
  let inventoryCount;
  if (inventory) {
    percent = inventory.percentage;
    inventoryCount = inventory.value;
  } else {
    percent = 0;
    inventoryCount = 0;
  }

  const displayInventoryCount = showNAIfZeroOrNull(inventoryCount, formatNumber(inventoryCount));
  const displayPercent = showNAIfZeroOrNull(percent, `${formatNumber(percent)}%`);

  return (
    <Table.Cell {...props}>
      <div
        className={`
          ${styles.inventoryBarCell}`}
      >
        <span> {displayInventoryCount} </span>
        <InventoryBar percent={percent / 100} />
        <span style={percent <= 25 ? { color: '#EB675E' } : {}}>{displayPercent}</span>
      </div>
    </Table.Cell>
  );
};

export default InventoryBarCell;
