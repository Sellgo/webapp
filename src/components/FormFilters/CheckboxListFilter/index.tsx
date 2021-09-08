import React from 'react';
import { Checkbox } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  label?: string;
  options: any[];
  selectedOptions: any;
  handleChange: (value: any) => void;
}
const CheckboxListFilter: React.FC<Props> = props => {
  const { label, handleChange, options, selectedOptions } = props;

  const handleCheckboxTick = (e: any, data: any) => {
    if (data.checked) {
      handleChange({ ...selectedOptions, [data.value]: true });
    } else {
      handleChange({ ...selectedOptions, [data.value]: false });
    }
  };

  return (
    <div className={styles.checkBoxFilters}>
      {label && <p>{label}</p>}
      <div className={styles.checkboxWrapper}>
        {options.map(f => {
          return (
            <Checkbox
              className={styles.checkboxOption}
              key={f.key}
              label={f.text}
              value={f.value}
              onChange={handleCheckboxTick}
              checked={selectedOptions[f.key] === true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CheckboxListFilter;
