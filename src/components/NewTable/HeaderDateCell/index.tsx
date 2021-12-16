import React from 'react';

/* Styling */
import styles from './index.module.scss';
import { UNIT_WIDTH } from '../../../constants/PerfectStock/OrderPlanning';

interface Props {
  title: string;
}

const HeaderDateCell = (props: Props) => {
  const { title } = props;
  return (
    <div className={styles.headerDateCell} style={{ height: UNIT_WIDTH }}>
      {title}
    </div>
  );
};

export default HeaderDateCell;
