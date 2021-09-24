import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import InventoryTableGroups from '../InventoryTableGroups';

const InventoryTableMeta = () => {
  return (
    <div className={styles.inventoryTableMeta}>
      <InventoryTableGroups />
    </div>
  );
};

export default InventoryTableMeta;
