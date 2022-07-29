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

  const isRepeatedZero = (key: string, currentVal: number) => {
    let repeatedZero = false;

    const previousDay = getDateOnly(new Date(new Date(dataKey).getTime() - MILLISECONDS_IN_A_DAY));

    if (rowData[previousDay] !== undefined && rowData[previousDay]?.[key] !== undefined) {
      if (currentVal === 0 && rowData[previousDay]?.[key] === 0) {
        repeatedZero = true;
      }
    }

    if (
      !rowData?.[previousDay] &&
      !rowData?.[dataKey] &&
      getDateOnly(new Date(new Date(dataKey).getTime())) !== getDateOnly(new Date())
    ) {
      repeatedZero = true;
    }

    return repeatedZero;
  };

  return (
    <Table.Cell {...otherProps}>
      <div
        className={`
          ${styles.inventoryBarCell}`}
      >
        <span className={styles.potentialLoss}> {displayLoss}</span>
        <span className={styles.inventoryCount}>
          {!isRepeatedZero('value', inventoryCount) && displayInventoryCount}
        </span>
        <InventoryBar percent={percent / 100} />
        {!isRepeatedZero('percentage', percent) && (
          <span style={percent <= 20 ? { color: '#EB675E' } : {}}>{displayPercent}</span>
        )}
      </div>
    </Table.Cell>
  );
};

export default React.memo(InventoryBarCell);
