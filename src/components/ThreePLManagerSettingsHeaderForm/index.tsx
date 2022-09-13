import React from 'react';
import { Input } from 'semantic-ui-react';

/* Components */
import SelectionFilter from '../FormFilters/SelectionFilter';

/* Styles */
import styles from './index.module.scss';

type IOption = {
  key: string;
  value: string;
  text: string;
};

interface Props {
  options?: IOption[];
  label: string;
  value: string;
  placeholder: string;
  dataKey: string;
  isNew?: boolean;
  addNewBtnLabel?: string;
  onChangeHandler: (id: string, value: string) => void;
  handleAddNewBtn?: () => void;
}

const ThreePLManagerSettingsHeaderForm = (props: Props) => {
  const {
    options = [],
    value,
    label,
    placeholder,
    onChangeHandler,
    isNew,
    dataKey,
    handleAddNewBtn,
    addNewBtnLabel,
  } = props;
  return (
    <>
      <section className={styles.selectHeaderForm}>
        {isNew && (
          <div className={styles.header}>
            <p className={styles.label}>{label}</p>
            <Input
              placeholder={placeholder}
              value={value}
              type="text"
              onChange={(e: any) => {
                onChangeHandler(dataKey, e.target.value);
              }}
              className={`
                  ${styles.inputFilter}
          `}
            />
          </div>
        )}
        {!isNew && (
          <SelectionFilter
            label={label}
            placeholder={placeholder}
            filterOptions={options} //names
            value={value || ''} //current name value
            handleChange={(value: string) => onChangeHandler(dataKey, value)}
            className={`
                  ${styles.inputFilter}
            `}
          />
        )}
        {!isNew && (
          <button onClick={handleAddNewBtn} className={styles.addButton}>
            {addNewBtnLabel}
          </button>
        )}
      </section>
    </>
  );
};

export default ThreePLManagerSettingsHeaderForm;
