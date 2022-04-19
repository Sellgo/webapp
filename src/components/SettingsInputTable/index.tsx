import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

/* Styling */
import styles from './index.module.scss';

/* Components */
import BoxContainer from '../BoxContainer';
import InputTable from './InputTable';
import ActionButton from '../ActionButton';
import Placeholder from '../Placeholder';

/* Utils */
import { error } from '../../utils/notifications';

/* Types */
import { Column } from '../../interfaces/PerfectStock/Settings';

interface Props {
  /* Fetch data is async, returns a promise */
  tableColumns: Column[];
  fetchData: () => any;
  handleSave: (payload: any) => any;
}

const SettingsInputTable = (props: Props) => {
  const { tableColumns, fetchData, handleSave } = props;

  /* Set modal to open by default if its an new lead time */
  const [tableData, setTableData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showEmptyError, setShowEmptyError] = useState<boolean>(false);

  React.useEffect(() => {
    setIsLoading(true);
    fetchData().then((data: any[]) => {
      setTableData(data);
      setIsLoading(false);
    });
  }, []);

  const handleDeleteRow = (id: number) => {
    const tableDataWithoutNewRows = tableData.filter((row: any) => {
      if (row.id === id && row.isNew) {
        return false;
      } else {
        return true;
      }
    });
    const tableDataWithUpdatedRows = tableDataWithoutNewRows.map(dataEntry => {
      if (dataEntry.id === id) {
        dataEntry.status = 'inactive';
      }
      return dataEntry;
    });

    setTableData(tableDataWithUpdatedRows);
  };

  const handleEditRow = (key: string, value: any, id: number) => {
    const newTableData = tableData.map(dataEntry => {
      if (dataEntry.id === id) {
        return {
          ...dataEntry,
          [key]: value,
        };
      }
      return dataEntry;
    });
    setTableData(newTableData);
  };

  const handleAddNewEntry = () => {
    const newEntry = { isNew: true, id: uuid() };
    setTableData([...tableData, newEntry]);
  };

  const handleSubmit = async () => {
    /* Check for any empty entries */
    let hasError = false;
    tableData.forEach(dataEntry => {
      tableColumns.forEach(column => {
        const key = column.dataKey;
        if (
          dataEntry.status !== 'inactive' &&
          (dataEntry[key] === null || dataEntry[key] === '' || dataEntry[key] === undefined)
        ) {
          hasError = true;
          return;
        }
      });
    });

    if (hasError) {
      error('Please fill in all the fields');
      setShowEmptyError(true);
      return;
    }

    setIsLoading(true);
    await handleSave(tableData);
    const data = await fetchData();
    setTableData(data);
    setIsLoading(false);
  };

  return (
    <div className={styles.settingsInputWrapper}>
      {/* PLACEHOLDER FOR LOADING STATE */}
      {isLoading && (
        <BoxContainer className={styles.boxContainer}>
          <Placeholder numberRows={5} numberParagraphs={1} />
        </BoxContainer>
      )}
      {!isLoading && (
        <BoxContainer className={styles.boxContainer}>
          <InputTable
            data={tableData.filter(dataEntry => dataEntry.status !== 'inactive')}
            tableColumns={tableColumns}
            handleDeleteRow={handleDeleteRow}
            handleEditRow={handleEditRow}
            showError={showEmptyError}
          />

          {/* Row to add new entries */}
          <div className={styles.buttonsRow}>
            <button onClick={handleAddNewEntry} className={styles.addButton}>
              + Add Expense
            </button>
            <ActionButton
              variant="secondary"
              type="purpleGradient"
              size="md"
              onClick={() => handleSubmit()}
              disabled={false}
            >
              Apply
            </ActionButton>
          </div>
        </BoxContainer>
      )}
    </div>
  );
};

export default SettingsInputTable;
