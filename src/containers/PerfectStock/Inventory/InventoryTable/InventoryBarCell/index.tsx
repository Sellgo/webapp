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
import { getDateOnly, MILLISECONDS_IN_A_DAY } from '../../../../../utils/date';

interface Props extends RowCell {
  isShowingDaysUntilStockout?: boolean;
}
const InventoryBarCell = (props: Props) => {
  const { isShowingDaysUntilStockout, ...otherProps } = props;
  const { rowData, dataKey } = otherProps;

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

  let isRepeatedZero = false;
  const previousDay = getDateOnly(new Date(new Date(dataKey).getTime() - MILLISECONDS_IN_A_DAY));
  if (rowData[previousDay] !== undefined && rowData[previousDay].percentage !== undefined) {
    if (percent === 0 && rowData[previousDay].percentage === 0) {
      isRepeatedZero = true;
    }
  }

  if (isShowingDaysUntilStockout) {
    return (
      <Table.Cell {...otherProps}>
        <div
          className={`
            ${styles.daysUntilStockoutCell}
            ${inventoryCount === 0 ? styles.daysUntilStockoutCell__red : ''}
          `}
        >
          <span>{inventory || 0}</span>
        </div>
      </Table.Cell>
    );
  }

  return (
    <Table.Cell {...otherProps}>
      <div
        className={`
          ${styles.inventoryBarCell}`}
      >
        <span className={styles.potentialLoss}> {displayLoss}</span>
        <span className={styles.inventoryCount}>
          {displayInventoryCount === '0' ? ' ' : displayInventoryCount}
        </span>
        <InventoryBar percent={percent / 100} />
        {!isRepeatedZero && (
          <span style={percent <= 20 ? { color: '#EB675E' } : {}}>{displayPercent}</span>
        )}
      </div>
    </Table.Cell>
  );
};

export default React.memo(InventoryBarCell);
