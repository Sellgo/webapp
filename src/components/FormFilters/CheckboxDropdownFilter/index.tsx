import React from 'react';
import { Checkbox, Input, Popup } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  label?: string;
  filterOptions: any[];
  currentFilterObject: any;
  handleChange: (value: any) => void;
}
const CheckboxDropdown: React.FC<Props> = props => {
  const { label, handleChange, filterOptions, currentFilterObject } = props;
  const [tickedCheckBoxes, setTickedCheckBoxes] = React.useState<string[]>([]);

  let DEFAULT_FILTER = {};
  filterOptions.map(option => {
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
    handleChange(newTickedCheckBoxes.join(', '));
  };
  return (
    <div className={styles.checkBoxFilters}>
      {label && <p>{label}</p>}
      <div className={styles.checkboxWrapper}>
        <Popup
          className="popup"
          on="click"
          position="bottom left"
          basic
          /* Button */
          trigger={
            <button className={styles.buttonWrapper}>
              <Input
                className={`${styles.inputWrapper} textInputFilter`}
                type="text"
                placeholder={label}
                value={currentFilterObject}
                icon={{ name: 'dropdown', className: styles.dropdownArrow }}
              />
            </button>
          }
          /* Dropdown content */
          content={
            <div className={styles.checkboxListWrapper}>
              {filterOptions.map(f => {
                return (
                  <Checkbox
                    className={styles.checkboxOption}
                    key={f.key}
                    label={f.text}
                    value={f.value}
                    onChange={handleCheckboxTick}
                    checked={currentFilterObject.includes(f.value)}
                  />
                );
              })}
            </div>
          }
        />
      </div>
    </div>
  );
};

export default CheckboxDropdown;
