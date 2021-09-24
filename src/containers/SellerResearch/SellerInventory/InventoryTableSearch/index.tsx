import React, { useState } from 'react';
import { Icon, Input } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

const InventoryTableSearch = () => {
  const [merchantIds, setMerchantIds] = useState('');

  const handleSubmit = () => {
    console.log('Search the table ');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <Input
        icon={<Icon name="search" className={styles.searchIcon} />}
        iconPosition="left"
        placeholder="Search"
        className={styles.searchInput}
        value={merchantIds}
        onChange={e => setMerchantIds(e.target.value)}
      />
    </form>
  );
};

export default InventoryTableSearch;
