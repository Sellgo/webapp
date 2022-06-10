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
  handleEditDataRow?: (key: string, value: any, id: number) => any;
  disableCreateNew?: boolean;
  disableReload?: boolean;
}

const SettingsInputTable = (props: Props) => {
  const {
    tableColumns,
    fetchData,
    handleSave,
    disableCreateNew,
    disableReload,
    handleEditDataRow,
  } = props;

  /* Set modal to open by default if its an new lead time */
  const [tableData, setTableData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showEmptyError, setShowEmptyError] = useState<boolean>(false);
  const [tableRowsIndex, setTableRowsIndex] = useState<any>(0);

  React.useEffect(() => {
    setIsLoading(true);
    fetchData().then((data: any[]) => {
      setTableData(data);
      setIsLoading(false);
    });
  }, []);

  React.useEffect(() => {
    let newTableRowsIndex = {};
    if (tableData.length !== 0) {
      tableData.forEach((row: any, index: number) => {
        newTableRowsIndex = { ...newTableRowsIndex, [row.id]: index };
      });
    }
    setTableRowsIndex(newTableRowsIndex);
  }, [tableData]);

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
    if (handleEditDataRow) {
      handleEditDataRow(key, value, id);
    }
    const rowIndex = tableRowsIndex[id];
    const newTableData = [...tableData];
    newTableData[rowIndex][key] = value;
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
          (dataEntry[key] === null || dataEntry[key] === '' || dataEntry[key] === undefined) &&
          !column.optional
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

    if (!disableReload) {
      setIsLoading(true);
    }
    await handleSave(tableData);

    if (!disableReload) {
      const data = await fetchData();
      setTableData(data);
      setIsLoading(false);
    }
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
            disableDelete={disableCreateNew}
          />

          {/* Row to add new entries */}
          <div className={styles.buttonsRow}>
            {!disableCreateNew && (
              <button onClick={handleAddNewEntry} className={styles.addButton}>
                + Add Expense
              </button>
            )}
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
