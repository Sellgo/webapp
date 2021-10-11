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

const SearchVolumeChange = (props: Props) => {
  const { align = 'left', ...otherProps } = props;

  const { rowData, dataKey } = otherProps;

  const top10Stat = rowData[`top_10_${dataKey}`];
  const changeTop10Percent = rowData[`change_top_10_${dataKey}`];

  const top50Stat = rowData[`top_50_${dataKey}`];
  const changeTop50Percent = rowData[`change_top_50_${dataKey}`];

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.changeStatsCell} style={{ textAlign: align }}>
        <DisplayChangeStat statsCount={top10Stat} changePercent={changeTop10Percent} />
        <DisplayChangeStat statsCount={top50Stat} changePercent={changeTop50Percent} />
      </div>
    </Table.Cell>
  );
};

export default SearchVolumeChange;
