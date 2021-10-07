import React, { useEffect, useState, memo } from 'react';
import _ from 'lodash';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import { MAX_KEYWORDS_ALLOWED } from '../../constants/KeywordResearch/KeywordTracker';

/* Components */
import FormFilterActions from '../FormFilters/FormFilterActions';
import InputFilter from '../FormFilters/InputFilter';
import TextAreaInput from '../FormFilters/TextAreaInput';
import MarketplaceDropdown from '../MarketplaceDropdown';
import CheckboxFilter from '../FormFilters/CheckboxFilter';

/* Utils */
import { removeSpecialCharctersFromKeywords, truncateString } from '../../utils/format';

/* Assets */
import placeholderImage from '../../assets/images/placeholderImage.svg';

/* Interfaces */
import { isValidAsin } from '../../constants';

interface GenericSubmitPayload {
  asin: string;
  keywords: string;
  trackParentsAndVariations: boolean;
}

interface ProductDetails {
  title: string;
  image: string;
}

interface Props {
  parentAsin: string;
  currentKeywordsCount: number;
  onSubmit: (payload: GenericSubmitPayload) => void;
  closeModal: () => void;
  productDetails: ProductDetails;
  currentKeywords?: string[];
}

const AddProductKeywordModal = (props: Props) => {
  const {
    parentAsin,
    currentKeywordsCount,
    onSubmit,
    closeModal,
    productDetails,
    currentKeywords,
  } = props;
  const [productAsin, setProductAsin] = useState<string>('');
  const [keywords, setKeywords] = useState(currentKeywords?.join('\n') || '');

  const [trackParentsAndVariations, setTrackParentsAndVariations] = useState<boolean>(false);
  const [removeSpecialChars, setRemoveSpecialChars] = useState<boolean>(false);

  const [newlyAddedKeywordsCount, setNewlyAddedKeywordsCount] = useState(0);

  // Submit Modal */
  const handleSubmit = () => {
    const addedKeywords = keywords
      .split('\n')
      .filter(a => a.length > 0)
      .join(',');

    const formattedKeywords = removeSpecialChars
      ? removeSpecialCharctersFromKeywords(addedKeywords)
      : addedKeywords;

    onSubmit({
      asin: parentAsin ? parentAsin : productAsin,
      keywords: formattedKeywords,
      trackParentsAndVariations,
    });
    closeModal();
  };

  // Handle Reset
  const handleReset = () => {
    if (!parentAsin) {
      setProductAsin('');
    }

    setKeywords('');
    setRemoveSpecialChars(false);
    setTrackParentsAndVariations(false);
  };

  /* Get ASIN from link */
  const convertAsinLinks = (data: string) => {
    const regex = RegExp('(?:[/dp/]|$)([A-Z0-9]{10})');
    const asinData = data.split(' ');
    _.each(asinData, (item, index) => {
      const res = item.match(regex);
      if (res) {
        asinData[index] = res[1];
      }
    });
    return asinData.join();
  };

  /* Handle ASIN change */
  const handleAsinChange = (value: string) => {
    const asin = convertAsinLinks(value);
    setProductAsin(asin);
  };

  useEffect(() => {
    const addedKeywords = keywords.split('\n').filter(a => a.trim().length > 0).length;
    setNewlyAddedKeywordsCount(addedKeywords);
  }, [keywords]);

  const leftKeywords = currentKeywordsCount + newlyAddedKeywordsCount;

  const shouldDisabledSubmit =
    currentKeywordsCount + newlyAddedKeywordsCount > MAX_KEYWORDS_ALLOWED;

  const { image, title } = productDetails;

  return (
    <div className={styles.addProductKeywordModal}>
      <div className={styles.metaData}>
        <h1>ADD NEW KEYWORDS</h1>
        {!parentAsin && <MarketplaceDropdown />}
      </div>

      <div className={styles.filterForm}>
        {/* If parent asin exists it means it only for adding new keywords/edit */}
        {!parentAsin && (
          <InputFilter
            label="Enter Amazon Product Link or ASIN"
            placeholder="Enter Amazon Product Link or ASIN"
            value={parentAsin ? parentAsin : productAsin}
            handleChange={handleAsinChange}
            className={styles.longInput}
            error={productAsin.length > 0 ? !isValidAsin(productAsin) : false}
            disabled={parentAsin.length > 0}
            handleOnPaste={handleAsinChange}
          />
        )}

        {parentAsin && (
          <div className={styles.productDetails}>
            <div className={styles.productImage}>
              <img src={image ? image : placeholderImage} alt={title} />
            </div>
            <div className={styles.productInfo}>
              <h3>{truncateString(title, 110)}</h3>
              <div className={styles.marketplaceInfo}>
                <img src={require(`../../assets/flags/US.png`)} alt="American Flag" />
                <span>{parentAsin}</span>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '30px' }} />

        <TextAreaInput
          label="Add Keywords"
          placeholder="Enter Keywords (1 per line)..."
          value={removeSpecialChars ? removeSpecialCharctersFromKeywords(keywords) : keywords}
          handleChange={(value: string) => {
            setKeywords(value);
          }}
          className={styles.addKeywordTextArea}
        />

        <CheckboxFilter
          checkboxLabel="Remove Special Characters"
          checked={removeSpecialChars}
          handleChange={(value: boolean) => setRemoveSpecialChars(value)}
        />

        {/* Show variations only when no parent ASIN exist i.e, first time tracking */}
        {!parentAsin && (
          <CheckboxFilter
            checkboxLabel="Track Parent Products and All Variations"
            checked={trackParentsAndVariations}
            handleChange={(value: boolean) => setTrackParentsAndVariations(value)}
          />
        )}

        <p className={styles.leftOverMessage}>
          Total keywords:
          <span>
            {leftKeywords}/{MAX_KEYWORDS_ALLOWED}
          </span>
        </p>

        <FormFilterActions
          resetLabel="Reset"
          submitLabel="Track"
          onReset={handleReset}
          onFind={handleSubmit}
          withSecondarySubmit
          disabled={shouldDisabledSubmit}
        />
      </div>
    </div>
  );
};

export default memo(AddProductKeywordModal);
