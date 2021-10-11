import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import { ReactComponent as Top10Icon } from '../../../../../assets/images/top10.svg';
import { ReactComponent as Top50Icon } from '../../../../../assets/images/top50.svg';

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';

const ChangeStatPeriod = (props: RowCell) => {
  return (
    <Table.Cell {...props}>
      <div className={styles.changeStatPeriod}>
        <Top10Icon />
        <Top50Icon className={styles.top50Icon} />
      </div>
    </Table.Cell>
  );
};

export default ChangeStatPeriod;
