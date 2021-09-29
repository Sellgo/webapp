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
    currentCompetitorsCount + newlyAddedCompetitorsCount > MAX_COMPETITORS_ALLOWED;

  useEffect(() => {
    const addedAsins = competitorsAsins.split('\n').filter(a => a.trim().length > 0).length;
    setNewlyAddedCompetitorsCount(addedAsins);
  }, [competitorsAsins]);

  return (
    <div className={styles.addCompetitorModal}>
      <div className={styles.metaData}>
        <h1>ADD COMPETITORS</h1>
        <MarketplaceDropdown />
      </div>

      <div className={styles.filterForm}>
        <InputFilter
          placeholder="Parent Product ASIN"
          value={parentAsin}
          disabled
          label="Parent ASIN"
          handleChange={() => {
            return;
          }}
          className={styles.longInput}
        />

        <div style={{ marginTop: '30px' }} />

        <TextAreaInput
          label="Add Competitor ASIN's"
          placeholder="Enter ASIN's (1 per line)..."
          value={competitorsAsins}
          handleChange={(value: string) => {
            setCompetitorsAsins(value.toUpperCase());
          }}
          className={styles.addAsinTextArea}
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
