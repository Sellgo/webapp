import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Interface */
import { RowCell } from '../../../interfaces/Table';
import InputFilter from '../../FormFilters/InputFilter';

interface Props extends RowCell {
  handleChange: (key: string, value: any, id: number) => void;
  identifier?: string;
  prependMessage?: string;
  appendMessage?: string;
  isNumber?: boolean;
  isPositiveOnly?: boolean;
  isInteger?: boolean;
  showEmptyError?: boolean;
  hasError?: boolean;
  disabled?: boolean;
  isLarge?: boolean;
  isLong?: boolean;
  allow5Decimal?: boolean;
}

const EditValueCell = (props: Props) => {
  const {
    handleChange,
    identifier,
    prependMessage,
    appendMessage,
    isNumber,
    isPositiveOnly,
    allow5Decimal,
    isInteger,
    showEmptyError,
    disabled,
    isLarge,
    isLong,
    hasError,
    ...otherProps
  } = props;
  const { rowData, dataKey } = otherProps;

  /* If identifier is not defined, default to the id of the cell */
  const cellIdentifier = identifier ? rowData.identifier : rowData.id;

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.editValueCellWrapper}>
        <p>{prependMessage}&nbsp;</p>
        <InputFilter
          isInteger={isInteger}
          isPositiveOnly={isPositiveOnly}
          value={rowData[dataKey] || ''}
          handleChange={(value: string) => {
            handleChange(dataKey, value, cellIdentifier);
          }}
          placeholder=""
          className={`
            ${styles.inputField} 
            ${!isLarge ? styles.inputField__small : ''}
            ${isLong ? styles.inputField__long : ''}
          `}
          isDate={dataKey === 'start_date' || dataKey === 'end_date'}
          isNumber={isNumber}
          thousandSeperate={isNumber}
          allow5Decimal={allow5Decimal}
          error={(!disabled && showEmptyError && !rowData[dataKey]) || hasError}
          disabled={disabled}
        />
        <p>&nbsp;{appendMessage}</p>
      </div>
    </Table.Cell>
  );
};

export default EditValueCell;
