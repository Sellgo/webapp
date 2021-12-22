import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Interface */
import { RowCell } from '../../../../../../../interfaces/Table';
import InputFilter from '../../../../../../../components/FormFilters/InputFilter';

/* Utils */
import { formatNumber, showNAIfZeroOrNull } from '../../../../../../../utils/format';

interface Props extends RowCell {
  handleChange: (key: string, value: string, id: number) => void;
}

const EditValueCell = (props: Props) => {
  const { handleChange, ...otherProps } = props;
  const { rowData, dataKey } = otherProps;
  const { id } = rowData;
  const daysToStockOut = showNAIfZeroOrNull(rowData[dataKey], formatNumber(rowData[dataKey]));

  const stockOutDate = new Date();
  stockOutDate.setDate(stockOutDate.getDate() + daysToStockOut);

  return (
    <Table.Cell {...props}>
      <InputFilter
        value={rowData[dataKey]}
        handleChange={(value: string) => handleChange(dataKey, value, id)}
        placeholder=""
        className={styles.inputField}
        isDate={dataKey === 'start_date' || dataKey === 'end_date'}
      />
    </Table.Cell>
  );
};

export default EditValueCell;
