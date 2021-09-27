import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import InventoryFilters from './InventoryFilter';
import AllExportProgress from './AllExportProgress';
import CentralScrapingProgressBar from './CentralScrapingProgress';
import InventoryTableGroups from './InventoryTableGroups';
import InventoryTableSearch from './InventoryTableSearch';
import InventoryExport from './InventoryExport';
import InventoryTable from './InventoryTable';

/* Providers */
import FindRefreshSellerProvider from './SocketProviders/FindRefreshSeller';
import FindRefreshSellerByAsin from './SocketProviders/FindRefreshSellerByAsin';
import CheckInventoryProvider from './SocketProviders/CheckInventory';
import SellerInventoryExportProvider from './SocketProviders/InventoryExportProvider';
import SellerInventoryProductsTableExportProvider from './SocketProviders/ProductsExportProvider';

const SellerInventory = () => {
  return (
    <div className={styles.sellerInventory}>
      <FindRefreshSellerProvider>
        <FindRefreshSellerByAsin>
          <InventoryFilters />

          {/* Unified centraal scraping progress*/}
          <CentralScrapingProgressBar />

          {/* Unified progress for all exports */}
          <AllExportProgress />

          {/* Seller Table meta info */}
          <section className={styles.sellerInventoryMeta}>
            <InventoryTableGroups />
            <InventoryTableSearch />
          </section>

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
        </FindRefreshSellerByAsin>
      </FindRefreshSellerProvider>
    </div>
  );
};
export default SellerInventory;
