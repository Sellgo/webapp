import React, { useEffect, useState } from 'react';
import { TabList, TabPanel, Tabs, Tab } from 'react-tabs';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import { setUserOnboardingResources } from '../../actions/UserOnboarding';

/* Selectors */
import { getUserOnboarding, getUserOnboardingResources } from '../../selectors/UserOnboarding';

/* Components */
import PageHeader from '../../components/PageHeader';
import ProductMetaInformation from '../../components/ProductMetaInformation';
import BetaLabel from '../../components/BetaLabel';

/* Containers */
import SellerMaps from './SellerMaps';
import SellerDatabase from './SellerDatabase';
import SellerInventory from './SellerInventory';

/* Assets */
import sellerDatabaseOnborading from '../../assets/onboardingResources/SellerResearch/sellerDatabaseOnboarding.json';
import sellerMapOnborading from '../../assets/onboardingResources/SellerResearch/sellerMapOnboarding.json';
import sellerInventoryOnboarding from '../../assets/onboardingResources/SellerResearch/sellerInventoryOnboarding.json';

/* Constants */
import {
  SELLER_RESEARCH_PAGES,
  SELLER_RESEARCH_PRODUCT_DETAILS,
} from '../../constants/SellerResearch';

import {
  FALLBACK_ONBOARDING_DETAILS,
  GENERAL_TUTORIAL_INDEX,
} from '../../constants/UserOnboarding';

interface Props {
  match: any;
  setUserOnboardingResources: (payload: any) => void;
  history: any;
  userOnboarding: boolean;
  userOnboardingResources: any[];
}

const SellerResearch = (props: Props) => {
  const {
    match,
    setUserOnboardingResources,
    userOnboardingResources,
    userOnboarding,
    history,
  } = props;

  const [selectedTabList, setSelectedTabList] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setSelectedTabList(index);
    history.push(SELLER_RESEARCH_PAGES[index]);
  };

  /* To update tab based on url */
  useEffect(() => {
    const currentIndex = SELLER_RESEARCH_PAGES.findIndex(
      (path: string) => path === window.location.pathname
    );

    /* If on a different tab, redirect to correct tab */
    if (currentIndex !== selectedTabList) {
      if (currentIndex === -1) {
        /* If is on any other page, e.g. /seller-research, or /seller-research/asd, redirect to first product */
        handleTabChange(0);
      } else {
        /* Update tab according to page */
        handleTabChange(currentIndex);
      }
    }
  }, [match]);

  useEffect(() => {
    if (selectedTabList === 0) {
      setUserOnboardingResources(sellerDatabaseOnborading);
    } else if (selectedTabList === 1) {
      setUserOnboardingResources(sellerMapOnborading);
    } else if (selectedTabList === 2) {
      setUserOnboardingResources(sellerInventoryOnboarding);
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
          { content: 'Seller Research', to: '/seller-research/database' },
          {
            content: SELLER_RESEARCH_PRODUCT_DETAILS[selectedTabList].name,
            to: SELLER_RESEARCH_PAGES[selectedTabList],
          },
        ]}
        auth={match.params.auth}
      />

      <main className={styles.sellerResearchPage}>
        {/* Product Meta Information */}
        <ProductMetaInformation
          selectedIndex={selectedTabList}
          informationDetails={SELLER_RESEARCH_PRODUCT_DETAILS}
          showTutorialOnboarding={showTutorialOnboarding}
          onboardingDisplayText={displayText}
          onboardingYoutubeLink={youtubeLink}
          isNewTutorial={true}
        />

        {/* Filter product selection */}
        <section className={styles.productSelectionList}>
          <Tabs
            className={styles.productTabs}
            selectedTabClassName={styles.activeProductTab}
            onSelect={handleTabChange}
            selectedIndex={selectedTabList}
          >
            <TabList className={styles.productTablist}>
              <Tab>Sellers</Tab>
              <Tab>Map</Tab>
              <Tab>
                Finder <BetaLabel isNav={true} className={styles.productBeta} />
              </Tab>
            </TabList>

            <TabPanel>
              <SellerDatabase />
            </TabPanel>

            <TabPanel>
              <SellerMaps />
            </TabPanel>

            <TabPanel>
              <SellerInventory />
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
