import React, { memo } from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { formatDecimal, formatNumber } from '../../../../../../utils/format';

/* Types */
import { RowCell } from '../../../../../../interfaces/Table';

const SkuStatCell = (props: RowCell) => {
  const { rowData, dataKey } = props;
  const displayStat = formatNumber(rowData[dataKey]);
  const displayRevenue = formatDecimal(rowData[`${dataKey}_revenue`]);
  return (
    <Table.Cell {...props}>
      <div className={styles.statsCell}>
        <span className={styles.stat}>{displayStat || '-'}</span>
        <span className={styles.revenue}>
          {displayRevenue !== 'NaN' ? `$${displayRevenue}` : '-'}
        </span>
      </div>
    </Table.Cell>
  );
};

export default memo(SkuStatCell);
