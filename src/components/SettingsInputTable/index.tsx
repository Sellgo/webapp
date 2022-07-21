import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

/* Styling */
import styles from './index.module.scss';

/* Components */
import BoxContainerSettings from '../BoxContainerSettings';
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
    if (handleEditDataRow) {
      handleEditDataRow(key, value, id);
    }
    const rowIndex = tableData.findIndex((row: any) => row.id === id);
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
          (dataEntry[key] === '' || dataEntry[key] === undefined) &&
          !column.optional
        ) {
          console.log(dataEntry[key], 'key');
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
        <BoxContainerSettings className={styles.boxContainer}>
          <Placeholder numberRows={5} numberParagraphs={1} />
        </BoxContainerSettings>
      )}
      {!isLoading && (
        <BoxContainerSettings className={styles.boxContainer}>
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
                + Add new item
              </button>
            )}
            <ActionButton
              className={styles.applyBtn}
              variant="secondary"
              type="purpleGradient"
              size="md"
              onClick={() => handleSubmit()}
              disabled={false}
            >
              Apply
            </ActionButton>
          </div>
        </BoxContainerSettings>
      )}
    </div>
  );
};

export default SettingsInputTable;
