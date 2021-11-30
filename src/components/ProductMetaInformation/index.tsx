import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import OnboardingButton from '../OnboardingButton';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchSellerDatabase } from '../../actions/SellerResearch/SellerDatabase';
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
  restoreLastSearchType?: 'Seller Database';

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
    restoreLastSearchType,
    fetchSellerDatabase,
  } = props;

  const { name, desc } = informationDetails[selectedIndex];

  const restoreLastSearch = () => {
    if (restoreLastSearchType === 'Seller Database') {
      fetchSellerDatabase({ restoreLastSearch: true });
    }
  };

  return (
    <section className={styles.productMetaInformation}>
      <h1>
        {name.toUpperCase()}: <span>{desc}</span>
      </h1>

      {restoreLastSearchType && (
        <button onClick={restoreLastSearch} className={styles.restoreLastSearchButton}>
          <Icon name="undo" />
          Last Search
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
