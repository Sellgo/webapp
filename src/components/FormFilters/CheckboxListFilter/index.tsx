import React from 'react';
import { Checkbox } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  label?: string;
}
const CheckboxListFilter: React.FC<Props> = props => {
  const { label } = props;

  return (
    <div className={styles.checkBoxFilters}>
      {label && <p>{label}</p>}
      <div className={styles.checkboxWrapper}>
        <Checkbox label="FBA" />
        <Checkbox label="FBM" />
        <Checkbox label="Amazon" />
      </div>
    </div>
  );
};

export default CheckboxListFilter;
