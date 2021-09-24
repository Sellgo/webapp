import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import InventoryFilters from './InventoryFilter';
import InventoryTableGroups from './InventoryTableGroups';
import InventoryTableSearch from './InventoryTableSearch';
import InventoryExport from './InventoryExport';
import InventoryTable from './InventoryTable';

const SellerInventory = () => {
  return (
    <div className={styles.sellerInventory}>
      <InventoryFilters />
      <section className={styles.sellerInventoryMeta}>
        <InventoryTableGroups />
        <InventoryTableSearch />
      </section>

      <InventoryExport />
      <InventoryTable />
    </div>
  );
};
export default SellerInventory;
