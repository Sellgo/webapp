import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Checkbox } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';
import './global.scss';

/* Selectors */
import {
  getIsLoadingKeywordTrackerProductVariation,
  getKeywordTrackerProductVariationsResults,
} from '../../../../../selectors/KeywordResearch/KeywordTracker';

/* Actions */
import {
  fetchKeywordTrackerProductVariation,
  fetchUpdateKeywordTrackerProductVariations,
  setKeywordTrackerVariationsResults,
  updateKeywordTrackerProduct,
} from '../../../../../actions/KeywordResearch/KeywordTracker';

/* Interfaces */
import {
  TrackerTableProductVariationsPayload,
  TrackerTableUpdateProductVariationsPayload,
  UpdateKeywordTrackerTableProductPayload,
} from '../../../../../interfaces/KeywordResearch/KeywordTracker';
import { Table } from 'rsuite';

/* Components */
import StatsCell from '../../../../../components/NewTable/StatsCell';
import TruncatedTextCell from '../../../../../components/NewTable/TruncatedTextCell';
import Placeholder from '../../../../../components/Placeholder';

/* Utils */
import { truncateString } from '../../../../../utils/format';

interface Props {
  keywordTrackProductId: number;
  title: string;
  image_url: string;
  asin: string;
  variationStatus: boolean;
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;

  /* Redux States */
  keywordTrackerProductVariationResults: any;
  isLoadingKeywordTrackerProductVariations: boolean;

  /* Redux Actions */
  fetchKeywordTrackerProductVariation: (payload: TrackerTableProductVariationsPayload) => void;
  fetchUpdateKeywordTrackerProductVariations: (
    payload: TrackerTableUpdateProductVariationsPayload
  ) => void;
  setKeywordTrackerVariationsResults: (payload: any) => void;
  updateKeywordTrackerProduct: (payload: UpdateKeywordTrackerTableProductPayload) => void;
}

const VariationModal = (props: Props) => {
  const {
    isModalOpen,
    keywordTrackProductId,
    fetchKeywordTrackerProductVariation,
    fetchUpdateKeywordTrackerProductVariations,
    updateKeywordTrackerProduct,
    setModalOpen,
    isLoadingKeywordTrackerProductVariations,
    keywordTrackerProductVariationResults,
    title,
    asin,
    image_url,
    variationStatus,
  } = props;

  /* Adding index to data */
  const keywordTrackerProductVariationResultsWithIndex = keywordTrackerProductVariationResults.map(
    (row: any, index: number) => {
      row.index = index + 1;
      return row;
    }
  );

  const [isUpdatingVariations, setVariationsUpdating] = useState<boolean>(false);
  const [isVariationsFullyUpdated, setVariationsFullyUpdated] = useState<boolean>(false);

  const handleUpdateVariations = () => {
    fetchUpdateKeywordTrackerProductVariations({ asin });
    setVariationsUpdating(true);
  };

  const handleUpdateVariationStatus = () => {
    updateKeywordTrackerProduct({
      keywordTrackProductId,
      key: 'variation_status',
      value: variationStatus ? 'inactive' : 'active',
    });
  };

  /* Upon completion of variation update, change state to reflect fully updated */
  React.useEffect(() => {
    if (isUpdatingVariations && !isVariationsFullyUpdated) {
      setVariationsFullyUpdated(true);
    }
  }, [keywordTrackerProductVariationResults]);

  /* Reset to default state when opening modal */
  React.useEffect(() => {
    if (isModalOpen) {
      fetchKeywordTrackerProductVariation({ keywordTrackProductId });
    }

    if (!isModalOpen) {
      setVariationsFullyUpdated(false);
      setVariationsUpdating(false);
      setKeywordTrackerVariationsResults([]);
    }
  }, [variationStatus, isModalOpen]);

  return (
    <Modal
      open={isModalOpen}
      onOpen={e => {
        e.preventDefault();
        e.stopPropagation();
        setModalOpen(true);
      }}
      className={styles.productVariationsModal}
      onClose={() => setModalOpen(false)}
      content={
        <div className={styles.productVariations}>
          <div className={styles.headerRow}>
            <h2> PRODUCT VARIATIONS </h2>
            <Checkbox toggle checked={variationStatus} onChange={handleUpdateVariationStatus} />
            <div className={styles.productInfoContainer}>
              {/* Product Image */}
              <div
                className={styles.productImage}
                style={{ backgroundImage: `url(${image_url})` }}
              />

              {/* Product Meta Details */}
              <div className={styles.productDetails}>
                {<h2> {truncateString(title, 145)} </h2>}

                <div className={styles.productMetaDetails}>
                  <img
                    src={require('../../../../../assets/images/USFlag.png')}
                    alt="American Flag"
                  />
                  {asin}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.productVariationsTableWrapper}>
            <p>Total {keywordTrackerProductVariationResults.length} variations </p>
            <Table
              renderLoading={() =>
                isLoadingKeywordTrackerProductVariations && (
                  <Placeholder numberParagraphs={1} numberRows={1} />
                )
              }
              data={
                !isLoadingKeywordTrackerProductVariations
                  ? keywordTrackerProductVariationResultsWithIndex
                  : []
              }
              height={590}
              hover={false}
              rowHeight={50}
              headerHeight={55}
              id="keywordTrackerProductVariationsTable"
              renderEmpty={() => <div />}
            >
              {/* # */}
              <Table.Column width={50} verticalAlign="top" align="left">
                <Table.HeaderCell>#</Table.HeaderCell>
                <StatsCell dataKey="index" align="left" />
              </Table.Column>

              {/* Asin */}
              <Table.Column width={130} verticalAlign="top" align="left">
                <Table.HeaderCell>ASIN</Table.HeaderCell>
                <TruncatedTextCell dataKey="asin" />
              </Table.Column>

              {/* Description */}
              <Table.Column verticalAlign="top" align="left" flexGrow={1}>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <TruncatedTextCell dataKey="description" maxLength={100} />
              </Table.Column>
            </Table>
            {!isVariationsFullyUpdated ? (
              <button
                className={styles.updateVariationsButton}
                /* Disable update variations if no variations are found */
                disabled={
                  isLoadingKeywordTrackerProductVariations ||
                  keywordTrackerProductVariationResultsWithIndex.length === 0
                }
                onClick={handleUpdateVariations}
              >
                Update Variations
              </button>
            ) : (
              <button
                className={`${styles.updateVariationsButton} ${styles.updateVariationsButton__success}`}
                disabled={isLoadingKeywordTrackerProductVariations}
              >
                Updated
              </button>
            )}
          </div>
        </div>
      }
    />
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoadingKeywordTrackerProductVariations: getIsLoadingKeywordTrackerProductVariation(state),
    keywordTrackerProductVariationResults: getKeywordTrackerProductVariationsResults(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchKeywordTrackerProductVariation: (payload: TrackerTableProductVariationsPayload) =>
      dispatch(fetchKeywordTrackerProductVariation(payload)),
    fetchUpdateKeywordTrackerProductVariations: (
      payload: TrackerTableUpdateProductVariationsPayload
    ) => dispatch(fetchUpdateKeywordTrackerProductVariations(payload)),
    setKeywordTrackerVariationsResults: (payload: any) =>
      dispatch(setKeywordTrackerVariationsResults(payload)),
    updateKeywordTrackerProduct: (payload: UpdateKeywordTrackerTableProductPayload) =>
      dispatch(updateKeywordTrackerProduct(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VariationModal);
