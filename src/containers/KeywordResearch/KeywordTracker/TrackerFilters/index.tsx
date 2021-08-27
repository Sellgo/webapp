import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import InputFilter from '../../../../components/FormFilters/InputFilter';
import FormFilterActions from '../../../../components/FormFilters/FormFilterActions';

/* Actions */
import {
  fetchKeywordTrackerProductsTable,
  trackProductWithAsinAndKeywords,
} from '../../../../actions/KeywordResearch/KeywordTracker';

/* Constants */
import { isValidAsin } from '../../../../constants';

/* Interfaces */
import {
  ProductTrackPayload,
  TrackerTableProductsPayload,
} from '../../../../interfaces/KeywordResearch/KeywordTracker';

interface Props {
  fetchKeywordTrackerProductsTable: (payload: TrackerTableProductsPayload) => void;
  trackProductWithAsinAndKeywords: (payload: ProductTrackPayload) => void;
}

const TrackerFilters = (props: Props) => {
  const { fetchKeywordTrackerProductsTable, trackProductWithAsinAndKeywords } = props;

  /* Basic Filters */
  const [asin, setAsin] = useState('');
  const [keywords, setKeywords] = useState('');
  const [trackParentsAndVariations, setTrackParentsAndVariations] = useState<boolean>(false);
  const [removeSpecialChars, setRemoveSpecialChars] = useState<boolean>(false);

  const [asinError, setAsinError] = useState(false);

  /* Handle Reset */
  const handleReset = () => {
    setAsin('');
    setKeywords('');
    setTrackParentsAndVariations(false);
    setRemoveSpecialChars(false);
    fetchKeywordTrackerProductsTable({ resetFilters: true });
  };

  /* Handle Submit */
  const handleSubmit = () => {
    const payload = {
      asin,
      keywords: removeSpecialChars
        ? keywords.replace(/[&/\\#+()$~%'":*?^<>{}@!_=]/g, '')
        : keywords,
    };

    setAsin('');
    setKeywords('');
    setTrackParentsAndVariations(false);
    setRemoveSpecialChars(false);
    trackProductWithAsinAndKeywords(payload);
  };

  /* Handle error for asin */
  useEffect(() => {
    if (asin.length > 0) {
      setAsinError(!isValidAsin(asin));
    } else {
      setAsinError(false);
    }
  }, [asin]);

  const shouldDisableForm = useMemo(() => {
    return !asin || !keywords || !isValidAsin(asin);
  }, [asin, keywords]);

  return (
    <section className={styles.filterSection}>
      {/* Basic Filters */}
      <div className={styles.basicFilters}>
        <InputFilter
          label="Add ASIN"
          placeholder="Enter ASIN for product"
          value={asin}
          handleChange={value => setAsin(value.toUpperCase())}
          className={styles.longInput}
          error={asinError}
        />

        <InputFilter
          label="Add Keywords"
          placeholder="Enter Keywords seperated by comma"
          value={keywords}
          handleChange={value => setKeywords(value)}
          className={styles.longInput}
        />

        <Checkbox
          readOnly={false}
          label="Track Parent Products and All Variations"
          checked={trackParentsAndVariations}
          onChange={() => setTrackParentsAndVariations(prevState => !prevState)}
          className={styles.checkbox}
        />

        <Checkbox
          readOnly={false}
          label="Remove Special Characters"
          checked={removeSpecialChars}
          onChange={() => setRemoveSpecialChars(prevState => !prevState)}
          className={styles.checkbox}
        />
      </div>
      <FormFilterActions
        onFind={handleSubmit}
        onReset={handleReset}
        submitLabel="Apply"
        disabled={shouldDisableForm}
      />
    </section>
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

export default connect(null, mapDispatchToProps)(TrackerFilters);
