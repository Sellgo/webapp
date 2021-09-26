import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import InventoryFilters from './InventoryFilter';
import InventoryExportProgress from './InventoryExportProgress';
import InventoryTableGroups from './InventoryTableGroups';
import InventoryTableSearch from './InventoryTableSearch';
import InventoryExport from './InventoryExport';
import InventoryTable from './InventoryTable';

/* Providers */
import SellerInventoryExportProvider from './InventoryExport/InventoryExportProvider';

const SellerInventory = () => {
  return (
    <div className={styles.sellerInventory}>
      <InventoryFilters />

      <InventoryExportProgress />

      <section className={styles.sellerInventoryMeta}>
        <InventoryTableGroups />
        <InventoryTableSearch />
      </section>

      <SellerInventoryExportProvider>
        <InventoryExport />
      </SellerInventoryExportProvider>

      <InventoryTable />
    </div>
  );
};
export default SellerInventory;
