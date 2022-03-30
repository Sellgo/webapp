import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Interface */
import { RowCell } from '../../../interfaces/Table';
import { Icon, Popup } from 'semantic-ui-react';

type IOption = {
  key: string;
  value: any;
  text: string;
};

interface Props extends RowCell {
  handleChange: (key: string, value: string, id: number) => void;
  options: IOption[];
  inputWidth?: number;
  align?: 'left' | 'center' | 'right';
  showEmptyError?: boolean;
}

/* ========================================================================== */
/* === Semantic UI's Dropdown CANNOT be used here, Pop up is needed since === */

/* ============= overflow is strictly hidden in a table setting ============= */
/* ========================================================================== */
const EditValueSelectionCell = (props: Props) => {
  const {
    handleChange,
    options,
    inputWidth = 150,
    align = 'center',
    showEmptyError,
    ...otherProps
  } = props;
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { rowData, dataKey } = otherProps;
  const { id } = rowData;

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  const alignmentSetting =
    align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center';
  const selectedDisplayText = options.find(option => option.value === rowData[dataKey])?.text;

  return (
    <Table.Cell {...otherProps}>
      <div
        className={styles.editValueSelectionCellWrapper}
        style={{ justifyContent: alignmentSetting }}
      >
        <Popup
          on="click"
          open={isOpen}
          onClose={handleClose}
          onOpen={handleOpen}
          trigger={
            <button
              className={`${styles.selectionButton}
                ${showEmptyError && !rowData[dataKey] ? styles.selectionButton__error : ''}`}
              style={{ width: inputWidth }}
            >
              <span>{selectedDisplayText || ''}</span>
              <Icon name="angle down" />
            </button>
          }
          logo="dropdown"
          basic
          className={styles.popupWrapper}
          style={{
            width: inputWidth,
          }}
          position="bottom center"
          content={
            <div className={styles.optionsWrapper}>
              {options.map((option: IOption) => (
                <div
                  className={styles.option}
                  key={option.key}
                  onClick={() => {
                    handleChange(dataKey, option.value, id);
                    handleClose();
                  }}
                >
                  <span>{option.text}</span>
                </div>
              ))}
            </div>
          }
        />
      </div>
    </Table.Cell>
  );
};

export default EditValueSelectionCell;
