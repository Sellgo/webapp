import React from 'react';
import { Table } from 'rsuite';

/* Types */
import { RowCell } from '../../../../../interfaces/Table';
import { SubscriptionPlanType } from '../../../../../interfaces/Settings/billing';

/* Components */
import PlanTypeRectangle from '../../../../../components/PlanTypeRectangle';

/* Styling */
import styles from './index.module.scss';

const PlanDescriptionCell = (props: RowCell) => {
  const { rowData, dataKey } = props;
  let planName: SubscriptionPlanType;

  if (rowData[dataKey] === 10) {
    planName = 'Professional Plan';
  } else if (rowData[dataKey] === 11) {
    planName = 'Team Plan';
  } else if (rowData[dataKey] === 12) {
    planName = 'Business Plan';
  } else {
    planName = 'Professional Plan';
  }

  if (!rowData[dataKey]) {
    return <Table.Cell {...props}>-</Table.Cell>;
  }

  return (
    <Table.Cell {...props}>
      <div className={styles.planDescriptionWrapper}>
        <PlanTypeRectangle plan={planName} isSmall />
      </div>
    </Table.Cell>
  );
};

export default PlanDescriptionCell;
