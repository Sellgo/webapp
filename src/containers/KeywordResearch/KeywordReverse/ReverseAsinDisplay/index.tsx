import React, { useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Modal, Popup } from 'semantic-ui-react';
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

/* Assets */
import { ReactComponent as CirclePlusIcon } from '../../../../assets/images/plus-circle-regular.svg';

/* Interfaces */
import { KeywordReverseAsinProduct } from '../../../../interfaces/KeywordResearch/KeywordReverse';

/* Constants */
import { MAX_ASINS_ALLOWED } from '../../../../constants/KeywordResearch/KeywordReverse';

/* Components */
import ReverseAsinCard from '../../../../components/ReverseAsinCard';
import BulkAsinAdder from '../../../../components/BulkAsinAdder';

/* Utils */
import { timeout } from '../../../../utils/timeout';
import TableResultsMessage from '../../../../components/TableResultsMessage';

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
  const [asinReferenceChange, setAsinReferenceChange] = useState({
    show: false,
    asin: '',
  });

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
  const handleAsinReferenceChange = (e: any) => {
    e.preventDefault();

    if (!asinReferenceChange.asin && !asinReferenceChange.show) {
      return;
    }

    const allAsins = keywordReverseProductsList && keywordReverseProductsList.map(a => a.asin);
    const filteredSelectedAsin = allAsins.filter(a => a !== asinReferenceChange.asin);

    const newAsinList = [asinReferenceChange.asin, ...filteredSelectedAsin];

    // restart the process for the ASIN with newly assigned references
    fetchKeywordReverseRequestId(newAsinList.join(','));

    setAsinReferenceChange({
      show: false,
      asin: '',
    });
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
        <div
          className={styles.addAsinCard}
          style={{
            opacity: disableAddAsinCard ? 0.6 : 1,
            cursor: disableAddAsinCard ? 'not-allowed' : 'pointer',
          }}
          onClick={() => !disableAddAsinCard && setShowAddBulkAsin(true)}
        >
          <CirclePlusIcon />
          <p>Add ASINs</p>
        </div>

        {/* Show the ASIN reverse card list */}
        <div className={styles.overflowWrapper}>
          {keywordReverseProductsList &&
            keywordReverseProductsList.map((keywordProduct, index: number) => {
              return (
                <Popup
                  key={uuid()}
                  on="click"
                  className={styles.changeAsinReferencePopup}
                  open={
                    asinReferenceChange.show && asinReferenceChange.asin === keywordProduct.asin
                  }
                  pinned
                  position="bottom center"
                  onClose={() => setAsinReferenceChange({ show: false, asin: '' })}
                  // Popup trigger is asin card
                  trigger={
                    <ReverseAsinCard
                      data={keywordProduct}
                      isLoading={
                        isLoadingKeywordReverseProductsList || shouldFetchKeywordReverseProgress
                      }
                      handleRemoveProduct={removeProduct}
                      handleCardClick={(asin: string) => {
                        setAsinReferenceChange({
                          asin,
                          show: true,
                        });
                      }}
                      isActive={index === 0}
                    />
                  }
                  content={
                    <div className={styles.changeAsinMessage}>
                      <button onClick={handleAsinReferenceChange}>Set as reference</button>
                    </div>
                  }
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
