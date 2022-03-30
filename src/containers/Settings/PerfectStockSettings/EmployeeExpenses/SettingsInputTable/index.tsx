import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

/* Styling */
import styles from './index.module.scss';

/* Components */
import BoxContainer from '../../../../../components/BoxContainer';
import InputTable from './InputTable';
import ActionButton from '../../../../../components/ActionButton';
import Placeholder from '../../../../../components/Placeholder';

/* Utils */
import { error } from '../../../../../utils/notifications';

interface Props {
  /* Fetch data is async, returns a promise */
  tableRowProperties: string[];
  fetchData: () => any;
  handleSave: (payload: any) => any;
}

const SettingsInputTable = (props: Props) => {
  const { tableRowProperties, fetchData, handleSave } = props;

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
      tableRowProperties.forEach(key => {
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
        <BoxContainer>
          <Placeholder numberRows={5} numberParagraphs={3} />
        </BoxContainer>
      )}
      {!isLoading && (
        <BoxContainer>
          <InputTable
            data={tableData.filter(dataEntry => dataEntry.status !== 'inactive')}
            handleDeleteRow={handleDeleteRow}
            handleEditRow={handleEditRow}
            showError={showEmptyError}
          />
          <div className={styles.buttonsRow}>
            <button onClick={handleAddNewEntry} className={styles.addButton}>
              + Add Employee Expense
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
