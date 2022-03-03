import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';

/* Components */
import InventoryBar from '../../../../../components/InventoryBar';

/* Utils */
import { formatNumber, prettyPrintNumber } from '../../../../../utils/format';

const InventoryBarCell = (props: RowCell) => {
  const { rowData, dataKey } = props;

  const inventory = rowData[dataKey];
  let percent;
  let inventoryCount;
  let potentialLoss;
  if (inventory) {
    percent = inventory.percentage;
    inventoryCount = inventory.value;
    potentialLoss = inventory.potential_loss;
  } else {
    potentialLoss = 0;
    percent = 0;
    inventoryCount = 0;
  }

  const displayInventoryCount = formatNumber(inventoryCount);
  const displayPercent = `${formatNumber(percent)}%`;
  const displayLoss = potentialLoss === 0 ? '' : `-$${prettyPrintNumber(potentialLoss)}`;

  return (
    <Table.Cell {...props}>
      <span
        className={`
          ${styles.inventoryBarCell}`}
      >
        <span className={styles.potentialLoss}> {displayLoss}</span>
        <span className={styles.inventoryCount}>
          {' '}
          {displayInventoryCount === '0' ? ' ' : displayInventoryCount}{' '}
        </span>
        <InventoryBar percent={percent / 100} />
        <span style={percent <= 25 ? { color: '#EB675E' } : {}}>{displayPercent}</span>
      </span>
    </Table.Cell>
  );
};

export default InventoryBarCell;
