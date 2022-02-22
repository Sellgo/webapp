import React, { useState } from 'react';
import { Popup } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import TableIcon from '../../components/Icons/TableIcon';

interface Props {
  children: React.ReactChild;
}

const ActionPopup = (props: Props) => {
  const { children } = props;
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div className={styles.actionCellWrapper}>
      <Popup
        className={styles.actionCellPopup}
        trigger={
          <div className={styles.actionCellTrigger}>
            <TableIcon name="ellipsis vertical" />
          </div>
        }
        on="click"
        onOpen={e => {
          e.preventDefault();
          e.stopPropagation();
          setOpenPopup(true);
        }}
        position="bottom right"
        offset="-15"
        onClose={() => setOpenPopup(false)}
        open={openPopup}
        content={<div className={styles.actionCellContent}>{children}</div>}
      />
    </div>
  );
};

export default ActionPopup;
