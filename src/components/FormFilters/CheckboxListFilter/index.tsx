import React from 'react';
import { Checkbox } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  label?: string;
  options: any[];
  currentFilterObject: any;
  handleChange: (value: any) => void;
}
const CheckboxListFilter: React.FC<Props> = props => {
  const { label, handleChange, options, currentFilterObject } = props;
  const [tickedCheckBoxes, setTickedCheckBoxes] = React.useState<string[]>([]);

  let DEFAULT_FILTER = {};
  options.map(option => {
    DEFAULT_FILTER = {
      ...DEFAULT_FILTER,
      [option.key]: false,
    };
    return option;
  });

  const handleCheckboxTick = (e: any, data: any) => {
    /* Updating local state */
    let newTickedCheckBoxes = tickedCheckBoxes;
    if (data.checked) {
      newTickedCheckBoxes.push(data.value);
    } else {
      newTickedCheckBoxes = newTickedCheckBoxes.filter(f => f !== data.value);
    }

    /* Handling change */
    let filterObject = DEFAULT_FILTER;
    newTickedCheckBoxes.map(
      filterValue =>
        (filterObject = {
          ...filterObject,
          [filterValue]: true,
        })
    );

    setTickedCheckBoxes(newTickedCheckBoxes);
    handleChange(filterObject);
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
              checked={currentFilterObject[f.key] === true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CheckboxListFilter;
