import React from 'react';
import { Checkbox } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import { DEFAULT_FULFILMENT_FILTER } from '../../../constants/ProductResearch/ProductsDatabase';

interface Props {
  label?: string;
  options: any[];
  handleChange: (type: string, value: any) => void;
}
const CheckboxListFilter: React.FC<Props> = props => {
  const { label, handleChange, options } = props;
  const [tickedCheckBoxes, setTickedCheckBoxes] = React.useState<string[]>([]);

  const handleCheckboxTick = (e: any, data: any) => {
    let newTickedCheckBoxes = tickedCheckBoxes;
    if (data.checked) {
      newTickedCheckBoxes.push(data.value);
    } else {
      newTickedCheckBoxes = newTickedCheckBoxes.filter(f => f !== data.value);
    }

    let fulfilment = DEFAULT_FULFILMENT_FILTER;
    newTickedCheckBoxes.map(
      filterValue =>
        (fulfilment = {
          ...fulfilment,
          [filterValue]: true,
        })
    );

    setTickedCheckBoxes(newTickedCheckBoxes);
    handleChange('checkedItems', fulfilment);
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
            />
          );
        })}
      </div>
    </div>
  );
};

export default CheckboxListFilter;
