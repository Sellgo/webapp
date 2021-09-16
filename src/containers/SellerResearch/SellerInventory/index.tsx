import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import InventoryFilters from './InventoryFilter';
import InventoryExport from './InventoryExport';

const SellerInventory = () => {
  return (
    <div className={styles.sellerInventory}>
      <InventoryFilters />
      <InventoryExport />
    </div>
  );
};
export default SellerInventory;
