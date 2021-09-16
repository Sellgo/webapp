import React from 'react';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Constants */
import { DEFAULT_PAGES_LIST } from '../../../../constants/SellerResearch/SellerInventory';

/* Components */
import Pagination from '../../../../components/NewTable/Pagination';

const InventoryTable = () => {
  /* Handle Page change*/
  const handlePageChange = (pageNo: number, perPageNo?: number) => {
    console.log({ page: pageNo, perPage: perPageNo });
  };

  return (
    <section className={styles.sellerInventoryTableWrapper}>
      {/* Pagination */}
      <footer className={styles.sellerInventoryPaginationContainer}>
        <Pagination
          totalPages={20}
          currentPage={2}
          onPageChange={handlePageChange}
          showSiblingsCount={3}
          showPerPage={true}
          perPage={20}
          perPageList={DEFAULT_PAGES_LIST}
        />
      </footer>
    </section>
  );
};

export default InventoryTable;
