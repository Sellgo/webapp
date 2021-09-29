import React, { useEffect, useState, memo } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import FormFilterActions from '../FormFilters/FormFilterActions';
import InputFilter from '../FormFilters/InputFilter';
import TextAreaInput from '../FormFilters/TextAreaInput';
import MarketplaceDropdown from '../MarketplaceDropdown';

/* Constants */
import { MAX_COMPETITORS_ALLOWED } from '../../constants/KeywordResearch/KeywordTracker';

/* Interfaces */
import { AddCompetitorsPayload } from '../../interfaces/KeywordResearch/KeywordTracker';
import { isValidAsin } from '../../constants';

interface Props {
  currentCompetitorsCount: number;
  onSubmit: (payload: AddCompetitorsPayload) => void;
  parentAsin: string;
  keywordTrackProductId: number;
}

const AddCompetitorsModal = (props: Props) => {
  const { currentCompetitorsCount, parentAsin, keywordTrackProductId, onSubmit } = props;

  const [competitorsAsins, setCompetitorsAsins] = useState('');
  const [newlyAddedCompetitorsCount, setNewlyAddedCompetitorsCount] = useState(0);
  const [competitorsAsinsError, setCompetitorsAsinsError] = useState(false);

  // Handle Reset
  const handleReset = () => {
    setCompetitorsAsins('');
  };

  // Submit Modal */
  const handleSubmit = () => {
    const newCompetitorsAsins = competitorsAsins
      .split('\n')
      .filter(a => a.length > 0)
      .join(',');

    onSubmit({
      asins: newCompetitorsAsins,
      keywordTrackProductId,
    });
  };

  const leftCompetitors = currentCompetitorsCount + newlyAddedCompetitorsCount;

  const shouldDisabledSubmit =
    currentCompetitorsCount + newlyAddedCompetitorsCount > MAX_COMPETITORS_ALLOWED ||
    competitorsAsinsError;

  useEffect(() => {
    const addedAsins = competitorsAsins.split('\n').filter(a => a.trim().length > 0);

    const addedAsinLength = addedAsins.length;

    const allValidAsins = addedAsins.every(a => isValidAsin(a));

    if (addedAsins.length > 0) {
      setCompetitorsAsinsError(!allValidAsins);
    } else {
      setCompetitorsAsinsError(false);
    }

    setNewlyAddedCompetitorsCount(addedAsinLength);
  }, [competitorsAsins]);

  return (
    <div className={styles.addCompetitorModal}>
      <div className={styles.metaData}>
        <h1>ADD COMPETITORS</h1>
        <MarketplaceDropdown />
      </div>

      <div className={styles.filterForm}>
        <InputFilter
          placeholder="Product ASIN"
          value={parentAsin}
          disabled
          label="Product ASIN"
          handleChange={() => {
            return;
          }}
          className={styles.longInput}
        />

        <div style={{ marginTop: '30px' }} />

        <TextAreaInput
          label="Add Competitor ASINs"
          placeholder="Enter ASIN's (1 per line)..."
          value={competitorsAsins}
          handleChange={(value: string) => {
            setCompetitorsAsins(value.toUpperCase());
          }}
          className={styles.addAsinTextArea}
          error={competitorsAsinsError}
        />

        <p className={styles.leftOverMessage}>
          Total ASINs:
          <span>
            {leftCompetitors}/{MAX_COMPETITORS_ALLOWED}
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

export default memo(AddCompetitorsModal);
