import React, { useState } from 'react';
import { connect } from 'react-redux';
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
import {
  fetchKeywordReverseRequestId,
  resetKeywordReverse,
} from '../../../../actions/KeywordResearch/KeywordReverse';

/* Interfaces */
import { KeywordReverseAsinProduct } from '../../../../interfaces/KeywordResearch/KeywordReverse';

/* Constants */
import { MAX_ASINS_ALLOWED } from '../../../../constants/KeywordResearch/KeywordReverse';

/* Components */
import ReverseAsinCard from '../../../../components/ReverseAsinCard';
import BulkAsinAdder from '../../../../components/BulkAsinAdder';
import TableResultsMessage from '../../../../components/TableResultsMessage';

/* Utils */
import { timeout } from '../../../../utils/timeout';

interface Props {
  isLoadingKeywordReverseProductsList: boolean;
  shouldFetchKeywordReverseProgress: boolean;
  keywordReverseProductsList: KeywordReverseAsinProduct[];
  fetchKeywordReverseRequestId: (payload: string) => void;
  resetKeywordReverse: () => void;
}

const ReverseAsinDisplay = (props: Props) => {
  const {
    keywordReverseProductsList,
    isLoadingKeywordReverseProductsList,
    shouldFetchKeywordReverseProgress,
    fetchKeywordReverseRequestId,
    resetKeywordReverse,
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

    const isLastProductAsin = keywordReverseProductsList && keywordReverseProductsList.length === 1;

    if (isLastProductAsin) {
      resetKeywordReverse();
    } else {
      fetchKeywordReverseRequestId(updatedAsins);
    }
  };

  // Handle submit and trigger reverse process
  const handleSubmit = async (payload: any) => {
    const { asins } = payload;
    fetchKeywordReverseRequestId(asins);
    await timeout(1000);
    setShowAddBulkAsin(false);
  };

  // Handle Confirm Reference
  const handleAsinReferenceChange = (asin: string) => {
    const allAsins = keywordReverseProductsList && keywordReverseProductsList.map(a => a.asin);
    const filteredSelectedAsin = allAsins.filter(a => a !== asin);

    const newAsinList = [asin, ...filteredSelectedAsin];

    // restart the process for the ASIN with newly assigned references
    fetchKeywordReverseRequestId(newAsinList.join(','));
  };

  // Disabling logic for the adding new asin
  const currentProductAsins = keywordReverseProductsList.map(a => a.asin).join(',');
  const totalProducts = keywordReverseProductsList.length;
  const disableAddAsinCard = totalProducts >= MAX_ASINS_ALLOWED;

  return (
    <section className={styles.reverseAsinDisplay}>
      {totalProducts > 0 ? (
        <TableResultsMessage
          prependMessage="Analyze"
          count={totalProducts || 0}
          appendMessage="ASINs."
        />
      ) : (
        <h2>ASIN-keyword Finder Results</h2>
      )}

      <div className={styles.reverseAsinCardsWrapper}>
        {/* Add new ASIN card */}
        <div className={styles.singleCardWrapper}>
          <div
            className={styles.addAsinCard}
            style={{
              opacity: disableAddAsinCard ? 0.6 : 1,
              cursor: disableAddAsinCard ? 'not-allowed' : 'pointer',
            }}
            onClick={() => !disableAddAsinCard && setShowAddBulkAsin(true)}
          >
            <span> + </span>
            <p>ADD ASIN</p>
          </div>
        </div>

        {/* Show the ASIN reverse card list */}
        <div className={styles.overflowWrapper}>
          {keywordReverseProductsList &&
            keywordReverseProductsList.map((keywordProduct, index: number) => {
              return (
                <ReverseAsinCard
                  key={index}
                  data={keywordProduct}
                  isLoading={
                    isLoadingKeywordReverseProductsList || shouldFetchKeywordReverseProgress
                  }
                  handleRemoveProduct={removeProduct}
                  handleCardClick={(asin: string) => {
                    handleAsinReferenceChange(asin);
                  }}
                  isActive={index === 0}
                  index={index}
                />
              );
            })}
        </div>
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
    resetKeywordReverse: () => dispatch(resetKeywordReverse()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReverseAsinDisplay);
