import React from 'react';
import { Checkbox, Input, Popup } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  label?: string;
  filterOptions: any[];
  selectedValues: string[];
  handleChange: (value: any) => void;
}
const CheckboxDropdown: React.FC<Props> = props => {
  const { label, handleChange, filterOptions, selectedValues } = props;

  const handleCheckboxTick = (e: any, data: any) => {
    let newSelectedValues = selectedValues;
    if (data.checked) {
      newSelectedValues.push(data.value);
    } else {
      newSelectedValues = newSelectedValues.filter(f => f !== data.value);
    }
    handleChange(newSelectedValues);
  };

  const trigger = (
    <button className={styles.buttonWrapper}>
      <Input
        className={`${styles.inputWrapper} textInputFilter`}
        type="text"
        placeholder={label}
        value={selectedValues}
        icon={{ name: 'dropdown', className: styles.dropdownArrow }}
      />
    </button>
  );
  return (
    <div className={styles.checkBoxDropdownFilters}>
      {label && <p>{label}</p>}
      <Popup
        className="popup"
        on="click"
        position="bottom left"
        basic
        trigger={trigger}
        /* Dropdown content */
        content={
          <div className={styles.dropdownWrapper}>
            <div className={styles.checkboxListWrapper}>
              {filterOptions.map(f => {
                return (
                  <Checkbox
                    className={styles.checkboxOption}
                    key={f.key}
                    label={f.text}
                    value={f.value}
                    onChange={handleCheckboxTick}
                    checked={selectedValues.includes(f.value)}
                  />
                );
              })}
            </div>
          </div>
        }
      />
    </div>
  );
};

export default CheckboxDropdown;
