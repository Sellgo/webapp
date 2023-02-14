import React from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import OnboardingButton from '../OnboardingButton';

/* Actions */
import { fetchSellerDatabase } from '../../actions/SellerResearch/SellerDatabase';

/* Types */
import { SellerDatabasePayload } from '../../interfaces/SellerResearch/SellerDatabase';

interface PInfo {
  name: string;
  desc: string;
}

interface Props {
  informationDetails: PInfo[];
  showTutorialOnboarding: boolean;
  onboardingDisplayText: string;
  onboardingYoutubeLink: string;
  selectedIndex: number;
  isNewTutorial: boolean;

  /* Redux Props */
  fetchSellerDatabase: (payload: SellerDatabasePayload) => void;
}

const ProductMetaInformation = (props: Props) => {
  const {
    selectedIndex,
    informationDetails,
    showTutorialOnboarding,
    onboardingYoutubeLink,
    onboardingDisplayText,
    isNewTutorial,
    fetchSellerDatabase,
  } = props;

  const { name, desc } = informationDetails[selectedIndex];

  let showRestoreLastSearch = false;
  let restoreLastSearch;

  if (name === 'Seller Database') {
    restoreLastSearch = () => fetchSellerDatabase({ restoreLastSearch: true });
    showRestoreLastSearch = true;
  }

  return (
    <section className={styles.productMetaInformation}>
      <h1>
        {name.toUpperCase()}: <span>{desc}</span>
      </h1>

      {showRestoreLastSearch && (
        <button onClick={restoreLastSearch} className={styles.restoreLastSearchButton}>
          <Icon name="undo" />
          Last search
        </button>
      )}
      {showTutorialOnboarding && (
        <OnboardingButton
          displayMessage={onboardingDisplayText}
          youtubeLink={onboardingYoutubeLink}
          isNew={isNewTutorial}
        />
      )}
    </section>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellerDatabase: (payload: SellerDatabasePayload) => dispatch(fetchSellerDatabase(payload)),
  };
};

export default connect(null, mapDispatchToProps)(ProductMetaInformation);
