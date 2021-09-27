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
import CentralScrapingProgress from './CentralScrapingProgress';

/* Providers */
import FindRefreshSellerProvider from './SocketProviders/FindRefreshSeller';
import CheckInventoryProvider from './SocketProviders/CheckInventory';

import SellerInventoryExportProvider from './InventoryExport/InventoryExportProvider';
import SellerInventoryProductsTableExportProvider from './SellerProductsTable/ProductsExport/ProductsExportProvider';

const SellerInventory = () => {
  return (
    <div className={styles.sellerInventory}>
      <InventoryFilters />

      {/* Unified centraal scraping progress*/}
      <CentralScrapingProgress />

      {/* Unified progress for all exports */}
      <AllExportProgress />

      {/* Seller Table meta info */}
      <section className={styles.sellerInventoryMeta}>
        <InventoryTableGroups />
        <InventoryTableSearch />
      </section>

      <FindRefreshSellerProvider>
        <CheckInventoryProvider>
          <SellerInventoryProductsTableExportProvider>
            {/* Seller Export */}
            <SellerInventoryExportProvider>
              <InventoryExport />
            </SellerInventoryExportProvider>

            {/* Seller table */}
            <InventoryTable />
          </SellerInventoryProductsTableExportProvider>
        </CheckInventoryProvider>
      </FindRefreshSellerProvider>
    </div>
  );
};
export default SellerInventory;
