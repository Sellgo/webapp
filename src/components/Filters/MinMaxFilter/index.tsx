import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import { ReactComponent as FilterRightArrow } from '../../../assets/images/filterRightArrow.svg';

interface Props {
  label: string;
}
const MinMaxFilter: React.FC<Props> = props => {
  const { label } = props;

  return (
    <div className={styles.minMaxFilter}>
      {label && <p>{label}</p>}
      <div className={styles.inputWrapper}>
        <input type="number" placeholder="Min" />
        <FilterRightArrow />
        <input type="number" placeholder="Max" />
      </div>
    </div>
  );
};

export default MinMaxFilter;
