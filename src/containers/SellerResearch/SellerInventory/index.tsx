import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import InventoryFilters from './InventoryFilter';
import AllExportProgress from './AllExportProgress';
import InventoryTableGroups from './InventoryTableGroups';
import InventoryTableSearch from './InventoryTableSearch';
import InventoryExport from './InventoryExport';
import InventoryTable from './InventoryTable';

/* Providers */
import SellerInventoryExportProvider from './InventoryExport/InventoryExportProvider';
import SellerInventoryProductsTableExportProvider from './SellerProductsTable/ProductsExport/ProductsExportProvider';

const SellerInventory = () => {
  return (
    <div className={styles.sellerInventory}>
      <InventoryFilters />

      {/* Unified progress for all exports */}
      <AllExportProgress />

      {/* Seller Table meta info */}
      <section className={styles.sellerInventoryMeta}>
        <InventoryTableGroups />
        <InventoryTableSearch />
      </section>

      <SellerInventoryExportProvider>
        <SellerInventoryProductsTableExportProvider>
          <InventoryExport />
          <InventoryTable />
        </SellerInventoryProductsTableExportProvider>
      </SellerInventoryExportProvider>
    </div>
  );
};
export default SellerInventory;
