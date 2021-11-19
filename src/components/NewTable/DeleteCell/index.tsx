import React, { memo } from 'react';
import { Table } from 'rsuite';
import { Confirm, Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Types */
import { RowCell } from '../../../interfaces/Table';

interface Props extends RowCell {
  handleDelete: (value: any) => void;
  deleteMessage: string;
}
/* Row Cell, for review stars */
const DeleteCell = (props: Props) => {
  const [deleteConfirmation, setDeleteConfirmation] = React.useState(false);
  const { handleDelete, deleteMessage, ...otherProps } = props;

  const { rowData, dataKey } = otherProps;

  return (
    <Table.Cell {...otherProps}>
      <button className={styles.deleteCell} onClick={() => setDeleteConfirmation(true)}>
        <Icon name="close" className={styles.closeIcon} />
      </button>
      <Confirm
        content={deleteMessage}
        open={deleteConfirmation}
        onCancel={() => setDeleteConfirmation(false)}
        onConfirm={() => {
          setDeleteConfirmation(false);
          handleDelete(rowData[dataKey]);
        }}
      />
    </Table.Cell>
  );
};

export default memo(DeleteCell);
