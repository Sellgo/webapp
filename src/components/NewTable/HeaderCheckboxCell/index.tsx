import React, { memo } from 'react';
import { Table } from 'rsuite';
import { Checkbox, Popup, Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Interfaces */
import { RowCell } from '../../../interfaces/Table';

interface Props extends RowCell {
  handleCheckboxClick: (e: any, data: any) => void;
  actionsCell: React.ReactNode;
}

const HeaderChekboxCell = (props: Props) => {
  const { handleCheckboxClick, actionsCell, ...otherProps } = props;

  return (
    <Table.HeaderCell {...otherProps}>
      <div className={styles.headerCheckBoxCell}>
        <Checkbox className={styles.checkbox} onChange={handleCheckboxClick} />

        <Popup
          className={styles.actionsCellPopup}
          on="click"
          position="bottom left"
          trigger={<Icon name="ellipsis vertical" className={styles.actionCellTrigger} />}
          content={actionsCell}
        />
      </div>
    </Table.HeaderCell>
  );
};

export default memo(HeaderChekboxCell);
