import React from 'react';
import { Table } from 'rsuite';

/* Types */
import { RowCell } from '../../../../../interfaces/Table';
import PlanTypeButton from '../../../../../components/PlanTypeButton';

import styles from './index.module.scss';

const PlanDescriptionCell = (props: RowCell) => {
  const { rowData, dataKey } = props;
  let planName: 'Professional' | 'Team' | 'Basic' = 'Basic';

  if (rowData[dataKey].includes('Professional')) {
    planName = 'Professional';
  } else if (rowData[dataKey].includes('Team')) {
    planName = 'Team';
  } else if (rowData[dataKey].includes('Basic')) {
    planName = 'Basic';
  }

  if (!rowData[dataKey]) {
    return <Table.Cell {...props}>-</Table.Cell>;
  }

  return (
    <Table.Cell {...props}>
      <div className={styles.planDescriptionWrapper}>
        <PlanTypeButton plan={planName} small />
      </div>
    </Table.Cell>
  );
};

export default PlanDescriptionCell;
