import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon, Input } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import { fetchSellerDatabase } from '../../../../actions/SellerResearch/SellerDatabase';

/* Interfaces */
import { SellerDatabasePayload } from '../../../../interfaces/SellerResearch/SellerDatabase';
import ActionButton from '../../../../components/ActionButton';

interface Props {
  fetchSellerDatabase: (payload: SellerDatabasePayload) => void;
}

const CollectionTableSearch = (props: Props) => {
  const { fetchSellerDatabase } = props;

  const [businessName, setBusinessName] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchSellerDatabase({ filterPayload: { isLookedUp: true, businessName: businessName } });
  };
  return (
    <>
      <p>Search Sellers</p>
      <div className={styles.collectionSearchFormWrapper}>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <Input
            icon={<Icon name="search" className={styles.searchIcon} />}
            iconPosition="left"
            placeholder="Search using business name"
            className={styles.searchInput}
            value={businessName}
            onChange={e => setBusinessName(e.target.value)}
          />
        </form>
        <ActionButton
          variant="primary"
          type={'purpleGradient'}
          size="small"
          onClick={() => {
            fetchSellerDatabase({
              filterPayload: { businessName: businessName, isLookedUp: true },
            });
          }}
          className={styles.searchButton}
          disabled={!businessName}
        >
          Check Seller
        </ActionButton>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellerDatabase: (payload: SellerDatabasePayload) => dispatch(fetchSellerDatabase(payload)),
  };
};

export default connect(null, mapDispatchToProps)(CollectionTableSearch);
