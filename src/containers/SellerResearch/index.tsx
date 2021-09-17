import React, { useEffect, useState } from 'react';
import { TabList, TabPanel, Tabs, Tab } from 'react-tabs';
import { connect } from 'react-redux';

/* Components */
import styles from './index.module.scss';

/* Components */
import PageHeader from '../../components/PageHeader';

/* Containers */
import SellerMaps from './SellerMaps';
import SellerDatabase from './SellerDatabase';

/* Actions */
import { setUserOnboardingResources } from '../../actions/UserOnboarding';

/* Selectors */
import { getUserOnboarding, getUserOnboardingResources } from '../../selectors/UserOnboarding';

/* Assets */
import sellerDatabaseOnborading from '../../assets/onboardingResources/SellerResearch/sellerDatabaseOnboarding.json';
import sellerMapOnborading from '../../assets/onboardingResources/SellerResearch/sellerMapOnboarding.json';

/* Constants */
import { SELLER_RESEARCH_FEATURES } from '../../constants/SellerResearch/SellerResearch';
import OnboardingButton from '../../components/OnboardingButton';
import {
  FALLBACK_ONBOARDING_DETAILS,
  GENERAL_TUTORIAL_INDEX,
} from '../../constants/UserOnboarding';

interface Props {
  match: any;
  setUserOnboardingResources: (payload: any) => void;
  userOnboarding: boolean;
  userOnboardingResources: any[];
}

const SellerResearchMapper = ['Database', 'Map', 'Inventories'];

const SellerResearch = (props: Props) => {
  const { match, setUserOnboardingResources, userOnboardingResources, userOnboarding } = props;

  const [selectedTabList, setSelectedTabList] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setSelectedTabList(index);
  };

  useEffect(() => {
    if (selectedTabList === 0) {
      setUserOnboardingResources(sellerDatabaseOnborading);
    } else if (selectedTabList === 1) {
      setUserOnboardingResources(sellerMapOnborading);
    }
  }, [selectedTabList]);

  /* User onboarding logic */
  const tutorialOnboardingDetails = userOnboardingResources[GENERAL_TUTORIAL_INDEX] || {};
  const showTutorialOnboarding =
    userOnboarding && Object.keys(tutorialOnboardingDetails).length > 0;
  const { youtubeLink, displayText } =
    tutorialOnboardingDetails.Tutorial || FALLBACK_ONBOARDING_DETAILS;

  return (
    <>
      <PageHeader
        title={`Seller Research`}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Seller Research', to: '/seller-research' },
          { content: SELLER_RESEARCH_FEATURES[selectedTabList].name, to: '/seller-research' },
        ]}
        auth={match.params.auth}
      />

      <main className={styles.sellerResearchPage}>
        {/* Filter meta data */}
        <section className={styles.filterMetaData}>
          <h1>Seller Research: {SellerResearchMapper[selectedTabList]}</h1>
          {showTutorialOnboarding && (
            <OnboardingButton displayMessage={displayText} youtubeLink={youtubeLink} isNew />
          )}
        </section>

        {/* Filter product selection */}
        <section className={styles.productSelectionList}>
          <Tabs
            className={styles.productTabs}
            selectedTabClassName={styles.activeProductTab}
            onSelect={handleTabChange}
            selectedIndex={selectedTabList}
          >
            <TabList className={styles.productTablist}>
              <Tab>DATABASE</Tab>
              <Tab>MAP</Tab>
            </TabList>

            <TabPanel>
              <SellerDatabase />
            </TabPanel>

            <TabPanel>
              <SellerMaps />
            </TabPanel>
          </Tabs>
        </section>
      </main>
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUserOnboardingResources: (payload: any) => dispatch(setUserOnboardingResources(payload)),
  };
};

const mapStateToProps = (state: any) => {
  return {
    userOnboarding: getUserOnboarding(state),
    userOnboardingResources: getUserOnboardingResources(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerResearch);
