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
  showTpl?: boolean;
  columnHeight?: number;
}
const InventoryBarCell = (props: Props) => {
  const { isShowingDaysUntilStockout, showTpl = false, columnHeight, ...otherProps } = props;
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

  if (isShowingDaysUntilStockout) {
    return (
      <Table.Cell {...otherProps} height={columnHeight}>
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

  let isRepeatedZero = false;
  const previousDay = getDateOnly(new Date(new Date(dataKey).getTime() - MILLISECONDS_IN_A_DAY));
  if (rowData[previousDay] !== undefined && rowData[previousDay]?.percentage !== undefined) {
    if (percent === 0 && rowData[previousDay].percentage === 0) {
      isRepeatedZero = true;
    }
  }

  return (
    <Table.Cell {...otherProps} height={columnHeight}>
      <div
        className={`
          ${styles.inventoryBarCell}`}
      >
        {!showTpl && <span className={styles.potentialLoss}> {displayLoss}</span>}
        <span className={styles.inventoryCount}>
          {displayInventoryCount === '0' ? ' ' : displayInventoryCount}
        </span>
        <InventoryBar percent={percent / 100} />
        {!isRepeatedZero && !showTpl && (
          <span style={percent <= 20 ? { color: '#EB675E' } : {}}>{displayPercent}</span>
        )}
        {showTpl && <span>{inventory.tpl}</span>}
      </div>
    </Table.Cell>
  );
};

export default React.memo(InventoryBarCell);
