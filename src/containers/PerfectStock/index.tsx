import React, { useEffect, useState } from 'react';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import OrderPlanning from './OrderPlanning';
import SalesProjection from './SalesProjection';
import CataloguePlanning from './CataloguePlanning';

/* Components */
import PageHeader from '../../components/PageHeader';
import ProductMetaInformation from '../../components/ProductMetaInformation';
import ProductLabel from '../../components/ProductLabel';

/* Selectors */
import { getUserOnboarding, getUserOnboardingResources } from '../../selectors/UserOnboarding';

/*Actions */
import { setUserOnboardingResources } from '../../actions/UserOnboarding';

/* COnstansts */
import { PERFECT_STOCK_PRODUCT_DETAILS, PERFECT_STOCK_PAGES } from '../../constants/PerfectStock';
import {
  FALLBACK_ONBOARDING_DETAILS,
  GENERAL_TUTORIAL_INDEX,
} from '../../constants/UserOnboarding';

/* Assets */
import databaseOnboarding from '../../assets/onboardingResources/ProductResearch/productDatabaseOnboarding.json';

interface Props {
  history: any;
  match: any;
  setUserOnboardingResources: (payload: any) => void;
  userOnboarding: boolean;
  userOnboardingResources: any[];
}

const ProductResearch: React.FC<Props> = props => {
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
    history.push(PERFECT_STOCK_PAGES[index]);
  };

  /* To update tab based on url */
  useEffect(() => {
    const currentIndex = PERFECT_STOCK_PAGES.findIndex(
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
      setUserOnboardingResources(databaseOnboarding);
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
        title={`Product Research`}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Product Research', to: '/product-research/database' },
          {
            content: PERFECT_STOCK_PRODUCT_DETAILS[selectedTabList].name,
            to: PERFECT_STOCK_PAGES[selectedTabList],
          },
        ]}
        auth={match.params.auth}
      />
      <main className={styles.productResearchPage}>
        {/* Product Meta Information */}
        <ProductMetaInformation
          selectedIndex={selectedTabList}
          informationDetails={PERFECT_STOCK_PRODUCT_DETAILS}
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
              <Tab>
                <ProductLabel
                  label="Order Planning"
                  icon="Product Database"
                  isActive={selectedTabList === 0}
                  isBeta
                />
              </Tab>
              <Tab>
                <ProductLabel
                  label="Catalogue Planning"
                  icon="Product Database"
                  isActive={selectedTabList === 1}
                  isBeta
                />
              </Tab>
              <Tab>
                <ProductLabel
                  label="Sales Estimation"
                  icon="Product Database"
                  isActive={selectedTabList === 2}
                  isBeta
                />
              </Tab>
            </TabList>

            <TabPanel>
              <OrderPlanning />
            </TabPanel>

            <TabPanel>
              <CataloguePlanning />
            </TabPanel>

            <TabPanel>
              <SalesProjection />
            </TabPanel>
          </Tabs>
        </section>
      </main>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userOnboarding: getUserOnboarding(state),
    userOnboardingResources: getUserOnboardingResources(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUserOnboardingResources: (payload: any) => dispatch(setUserOnboardingResources(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductResearch);
