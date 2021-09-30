import React, { useEffect, useState } from 'react';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import ProductsDatabase from './ProductsDatabase';

/* Components */
import PageHeader from '../../components/PageHeader';
import ProductMetaInformation from '../../components/ProductMetaInformation';

/* Selectors */
import { getUserOnboarding, getUserOnboardingResources } from '../../selectors/UserOnboarding';

/*Actions */
import { setUserOnboardingResources } from '../../actions/UserOnboarding';

/* COnstansts */
import { PRODUCT_RESEARCH_PRODUCT_DETAILS } from '../../constants/ProductResearch';
import {
  FALLBACK_ONBOARDING_DETAILS,
  GENERAL_TUTORIAL_INDEX,
} from '../../constants/UserOnboarding';

/* Assets */
import databaseOnboarding from '../../assets/onboardingResources/ProductResearch/productDatabaseOnboarding.json';

interface Props {
  match: any;
  setUserOnboardingResources: (payload: any) => void;
  userOnboarding: boolean;
  userOnboardingResources: any[];
}

const ProductResearch: React.FC<Props> = props => {
  const { match, setUserOnboardingResources, userOnboardingResources, userOnboarding } = props;

  const [selectedTabList, setSelectedTabList] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setSelectedTabList(index);
  };

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
          {
            content: 'Product Research',
            to: '/product-research',
          },
        ]}
        auth={match.params.auth}
      />
      <main className={styles.productResearchPage}>
        {/* Product Meta Information */}
        <ProductMetaInformation
          selectedIndex={selectedTabList}
          informationDetails={PRODUCT_RESEARCH_PRODUCT_DETAILS}
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
              <Tab>Products</Tab>
            </TabList>

            <TabPanel>
              <ProductsDatabase />
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
