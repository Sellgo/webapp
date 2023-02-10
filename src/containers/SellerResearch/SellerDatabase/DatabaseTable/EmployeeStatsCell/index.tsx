/* eslint-disable valid-typeof */
import React, { memo } from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { formatNumber } from '../../../../../utils/format';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';

const EmployeeStatsCell = (props: RowCell) => {
  const { rowData, dataKey } = props;

  const rawContent = rowData?.employee_stats?.[dataKey];

  return (
    <Table.Cell {...props}>
      <div className={styles.employeeStatsCell}>{`${
        rawContent ? formatNumber(rawContent) : '-'
      }`}</div>
    </Table.Cell>
  );
};

export default memo(EmployeeStatsCell);
