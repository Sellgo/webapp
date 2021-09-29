import React, { useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';

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
  setKeywordReverseProductsList,
} from '../../../../actions/KeywordResearch/KeywordReverse';

/* Components */
import ReverseAsinCard from '../../../../components/ReverseAsinCard';
import ReverseAsinCardOverlay from '../../../../components/ReverseAsinCard/Overlay';

/* Assets */
// import { ReactComponent as CirclePlusIcon } from '../../../../assets/images/plus-circle-regular.svg';
import { ReactComponent as ThinPlusIcon } from '../../../../assets/images/thinAddIcon.svg';

/* Interfaces */
import { KeywordReverseAsinProduct } from '../../../../interfaces/KeywordResearch/KeywordReverse';

/* Constants */
import { MAX_ASINS_ALLOWED } from '../../../../constants/KeywordResearch/KeywordReverse';

interface Props {
  isLoadingKeywordReverseProductsList: boolean;
  shouldFetchKeywordReverseProgress: boolean;
  keywordReverseProductsList: KeywordReverseAsinProduct[];
  setKeywordReverseProductsList: (payload: KeywordReverseAsinProduct[]) => void;
}

const ReverseAsinDisplay = (props: Props) => {
  const {
    keywordReverseProductsList,
    isLoadingKeywordReverseProductsList,
    shouldFetchKeywordReverseProgress,
    setKeywordReverseProductsList,
  } = props;

  const [showAddAsin, setShowAddAsin] = useState(false);

  const totalProducts = keywordReverseProductsList.length;

  // Handle a proudtc removal
  const removeProduct = (asinToRemove: string) => {
    const currentProducts = keywordReverseProductsList;

    const updatedProducts =
      currentProducts &&
      currentProducts.filter(product => {
        return product.asin !== asinToRemove;
      });

    setKeywordReverseProductsList(updatedProducts);
  };

  const dontShowAddAsinCard =
    totalProducts >= MAX_ASINS_ALLOWED || (totalProducts === MAX_ASINS_ALLOWED - 1 && showAddAsin);

  return (
    <section className={styles.reverseAsinDisplay}>
      <h2>Asin-Keyword Reversal Results</h2>

      <div className={styles.reverseAsinCardsWrapper}>
        {/* Add new ASIN card */}
        {!dontShowAddAsinCard && (
          <>
            <div className={styles.addAsinCard}>
              <ThinPlusIcon style={{ cursor: 'pointer' }} onClick={() => setShowAddAsin(true)} />
              <p>Add ASIN</p>
            </div>
          </>
        )}

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

        {/* Show the ASIN reverse card overlay hwhere you can add new asin */}
        {showAddAsin && MAX_ASINS_ALLOWED > totalProducts && (
          <ReverseAsinCardOverlay
            hideOverlay={() => setShowAddAsin(false)}
            isLoading={isLoadingKeywordReverseProductsList || shouldFetchKeywordReverseProgress}
          />
        )}
      </div>
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
    setKeywordReverseProductsList: (payload: KeywordReverseAsinProduct[]) =>
      dispatch(setKeywordReverseProductsList(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReverseAsinDisplay);
