import React from 'react';
import { Checkbox } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

type IFilterOptions = {
  label: string;
  value: any;
};

interface Props {
  label?: string;
  filterOptions: IFilterOptions[];
  value: string;
  handleChange: (value: any) => void;
}

const RadioListFilters: React.FC<Props> = props => {
  const { label, filterOptions, value, handleChange } = props;

  return (
    <div className={styles.radioBoxFilters}>
      {label && <p>{label}</p>}
      <div className={styles.radioboxWrapper} data-count={filterOptions.length}>
        {filterOptions.map((option: IFilterOptions) => {
          return (
            <Checkbox
              radio
              className={styles.checkbox}
              label={option.label}
              checked={option.value === value}
              key={option.label}
              onChange={() => handleChange(option.value)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RadioListFilters;
