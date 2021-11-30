import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Componenent */
import DisplayChangeStat from '../../../../../components/NewTable/DisplayChangeStat';

/* Types */
import { RowCell } from '../../../../../interfaces/Table';

interface Props extends RowCell {
  align?: 'left' | 'right' | 'center';
}

const ChangeStats = (props: Props) => {
  const { align = 'left', ...otherProps } = props;

  const { rowData, dataKey } = otherProps;

  const stat = rowData[dataKey];
  const change = rowData[`change_${dataKey}`];

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.changeStatsCell} style={{ textAlign: align }}>
        <DisplayChangeStat statsCount={stat} changePercent={change} />
      </div>
    </Table.Cell>
  );
};

export default ChangeStats;
