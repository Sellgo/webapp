import React from 'react';
import { Checkbox } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  label: string;
  checked: boolean;
  handleChange: (value: boolean) => void;
  checkboxLabel: string;
}

const CheckboxFilter = (props: Props) => {
  const { label, checked, handleChange, checkboxLabel } = props;

  return (
    <div className={styles.checkboxFilter}>
      <p>{label}</p>
      <Checkbox
        readOnly={false}
        label={checkboxLabel}
        checked={checked}
        onChange={(e: any, data: any) => {
          handleChange(data.checked);
        }}
        className={styles.checkbox}
      />
    </div>
  );
};

export default CheckboxFilter;
