import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import keepaLogo from '../../../../../assets/images/keepaLogo.png';

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';

const CheckOnKeepa = (props: RowCell) => {
  const { rowData } = props;

  const keepaLink = rowData.keepa_url;

  const handleOpenInKeepa = () => {
    window.open(keepaLink, '_blank');
  };

  return (
    <Table.Cell {...props}>
      <div className={styles.checkOnKeepa}>
        {keepaLink ? (
          <img src={keepaLogo} alt="Keepa Logo" onClick={handleOpenInKeepa} />
        ) : (
          <p>-</p>
        )}
      </div>
    </Table.Cell>
  );
};

export default CheckOnKeepa;
