import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon, Input } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import { fetchSellerInventoryTableResults } from '../../../../actions/SellerResearch/SellerInventory';

/* Interfaces */
import { SellerInventoryTablePayload } from '../../../../interfaces/SellerResearch/SellerInventory';

interface Props {
  fetchSellerInventoryTableResults: (payload: SellerInventoryTablePayload) => void;
}

const InventoryTableSearch = (props: Props) => {
  const { fetchSellerInventoryTableResults } = props;

  const [merchantId, setMerchantId] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchSellerInventoryTableResults({
      search: merchantId,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <Input
        icon={<Icon name="search" className={styles.searchIcon} />}
        iconPosition="left"
        placeholder="Search Merchant using ID"
        className={styles.searchInput}
        value={merchantId}
        onChange={e => setMerchantId(e.target.value)}
      />
    </form>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellerInventoryTableResults: (payload: SellerInventoryTablePayload) =>
      dispatch(fetchSellerInventoryTableResults(payload)),
  };
};

export default connect(null, mapDispatchToProps)(InventoryTableSearch);
