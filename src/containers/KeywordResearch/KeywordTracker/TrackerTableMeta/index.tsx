import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon, Input, Modal } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import {
  fetchKeywordTrackerProductsTable,
  trackProductWithAsinAndKeywords,
} from '../../../../actions/KeywordResearch/KeywordTracker';

/* Components */
import AddProductKeywordModal from '../../../../components/AddProductKeywordModal';

/* Interfaces */
import {
  ProductTrackPayload,
  TrackerTableProductsPayload,
} from '../../../../interfaces/KeywordResearch/KeywordTracker';

/* Assets */
import { ReactComponent as ThinAddIcon } from '../../../../assets/images/thinAddIcon.svg';

interface Props {
  fetchKeywordTrackerProductsTable: (payload: TrackerTableProductsPayload) => void;
  trackProductWithAsinAndKeywords: (payload: ProductTrackPayload) => void;
}

const TrackerExport = (props: Props) => {
  const { trackProductWithAsinAndKeywords, fetchKeywordTrackerProductsTable } = props;

  const [searchTerm, setSearchTerm] = useState('');
  const [addProductModal, setAddProductModal] = useState(false);

  /* Handle submit after search */
  const handleSubmit = (e: any) => {
    e.preventDefault();

    fetchKeywordTrackerProductsTable({
      search: searchTerm,
    });
  };

  /* Track new product or ASIN */
  const handleTrackProduct = (payload: any) => {
    const sendPayload = {
      asin: payload.asin,
      keywords: payload.keywords,
      trackParentsAndVariations: payload.trackParentsAndVariations,
    };
    trackProductWithAsinAndKeywords(sendPayload);
  };

  return (
    <div className={styles.trackerTableMeta}>
      {/* Track product and keywords */}
      <button className={styles.addNewProduct} onClick={() => setAddProductModal(true)}>
        <ThinAddIcon />
        Add New Product
      </button>

      {/* Search keywords on child table */}
      <form onSubmit={handleSubmit}>
        <Input
          icon={<Icon name="search" className={styles.searchIcon} />}
          iconPosition="left"
          placeholder="Search"
          className={styles.searchInput}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </form>

      {/* Add Products Modal */}
      <Modal
        open={addProductModal}
        className={styles.addProductModal}
        onClose={() => setAddProductModal(false)}
        content={
          <AddProductKeywordModal
            parentAsin=""
            currentKeywordsCount={0}
            onSubmit={handleTrackProduct}
            closeModal={() => setAddProductModal(false)}
            productDetails={{
              image: '',
              title: '',
            }}
          />
        }
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchKeywordTrackerProductsTable: (payload: TrackerTableProductsPayload) =>
      dispatch(fetchKeywordTrackerProductsTable(payload)),
    trackProductWithAsinAndKeywords: (payload: ProductTrackPayload) =>
      dispatch(trackProductWithAsinAndKeywords(payload)),
  };
};

export default connect(null, mapDispatchToProps)(TrackerExport);
