import React, { useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Modal } from 'semantic-ui-react';
/* Styling */
import styles from './index.module.scss';

/* Selectors */
import {
  getIsLoadingKeywordReverseProductsList,
  getKeywordReverseProductsList,
  getShouldFetchKeywordReverseProgress,
} from '../../../../selectors/KeywordResearch/KeywordReverse';

/* Actions */
import { fetchKeywordReverseRequestId } from '../../../../actions/KeywordResearch/KeywordReverse';

/* Assets */
import { ReactComponent as CirclePlusIcon } from '../../../../assets/images/plus-circle-regular.svg';

/* Interfaces */
import { KeywordReverseAsinProduct } from '../../../../interfaces/KeywordResearch/KeywordReverse';

/* Constants */
import { MAX_ASINS_ALLOWED } from '../../../../constants/KeywordResearch/KeywordReverse';

/* Components */
import ReverseAsinCard from '../../../../components/ReverseAsinCard';
import BulkAsinAdder from '../../../../components/BulkAsinAdder';
import { timeout } from '../../../../utils/timeout';

interface Props {
  isLoadingKeywordReverseProductsList: boolean;
  shouldFetchKeywordReverseProgress: boolean;
  keywordReverseProductsList: KeywordReverseAsinProduct[];
  fetchKeywordReverseRequestId: (payload: string) => void;
}

const ReverseAsinDisplay = (props: Props) => {
  const {
    keywordReverseProductsList,
    isLoadingKeywordReverseProductsList,
    shouldFetchKeywordReverseProgress,
    fetchKeywordReverseRequestId,
  } = props;

  const [showAddBulkAsin, setShowAddBulkAsin] = useState(false);

  // Handle a product removal
  const removeProduct = async (asinToRemove: string) => {
    const updatedAsins =
      keywordReverseProductsList &&
      keywordReverseProductsList
        .filter(product => {
          return product.asin !== asinToRemove;
        })
        .map(a => a.asin)
        .join(',');

    fetchKeywordReverseRequestId(updatedAsins);
  };

  // Handle submit and trigger reverse process
  const handleSubmit = async (payload: any) => {
    const { asins } = payload;
    fetchKeywordReverseRequestId(asins);
    await timeout(1000);
    setShowAddBulkAsin(false);
  };

  const currentProductAsins = keywordReverseProductsList.map(a => a.asin).join(',');
  const totalProducts = keywordReverseProductsList.length;
  const disableAddAsinCard = totalProducts >= MAX_ASINS_ALLOWED;

  return (
    <section className={styles.reverseAsinDisplay}>
      <h2>Asin-Keyword Reversal Results</h2>

      <div className={styles.reverseAsinCardsWrapper}>
        {/* Add new ASIN card */}
        <div className={styles.addAsinCard} style={{ opacity: disableAddAsinCard ? 0.6 : 1 }}>
          <CirclePlusIcon
            style={{ cursor: disableAddAsinCard ? 'pointer' : 'unset' }}
            onClick={() => !disableAddAsinCard && setShowAddBulkAsin(true)}
          />
          <p>Add ASINs</p>
        </div>

        {/* Show the ASIN reverse card list */}
        {keywordReverseProductsList &&
          keywordReverseProductsList.map((keywordProduct, index: number) => {
            return (
              <ReverseAsinCard
                key={uuid()}
                data={keywordProduct}
                isLoading={isLoadingKeywordReverseProductsList || shouldFetchKeywordReverseProgress}
                handleRemoveProduct={asin => removeProduct(asin)}
                isActive={index === 0}
              />
            );
          })}
      </div>

      {/* Add Bulk ASSIN's Modal */}
      <Modal
        open={showAddBulkAsin}
        className={styles.addBulkAsinsModal}
        onClose={() => setShowAddBulkAsin(false)}
        content={
          <BulkAsinAdder
            label="Add Bulk ASINs"
            maxAsinsAllowed={MAX_ASINS_ALLOWED}
            currentAsins={currentProductAsins}
            onSubmit={handleSubmit}
            submitLabel="Apply"
            hideReset={true}
          />
        }
      />
    </section>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoadingKeywordReverseProductsList: getIsLoadingKeywordReverseProductsList(state),
    keywordReverseProductsList: getKeywordReverseProductsList(state),
    shouldFetchKeywordReverseProgress: getShouldFetchKeywordReverseProgress(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchKeywordReverseRequestId: (payload: string) =>
      dispatch(fetchKeywordReverseRequestId(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReverseAsinDisplay);
