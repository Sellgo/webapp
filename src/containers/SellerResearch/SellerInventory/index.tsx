import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import InventoryFilters from './InventoryFilter';
import InventoryExport from './InventoryExport';
import InventoryTable from './InventoryTable';

const SellerInventory = () => {
  return (
    <div className={styles.sellerInventory}>
      <InventoryFilters />
      <InventoryExport />
      <InventoryTable />
    </div>
  );
};
export default SellerInventory;
