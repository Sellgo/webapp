import React, { useState, useEffect } from 'react';
import { TabList, TabPanel, Tabs, Tab } from 'react-tabs';
import { connect } from 'react-redux';

/* Styles */
import styles from './index.module.scss';

/* Selectors */
import { getUserOnboarding, getUserOnboardingResources } from '../../selectors/UserOnboarding';

/* Constansts */
import {
  FALLBACK_ONBOARDING_DETAILS,
  GENERAL_TUTORIAL_INDEX,
} from '../../constants/UserOnboarding';
import {
  KEYWORD_RESEARCH_PRODUCT_DETAILS,
  KEYWORD_RESEARCH_PAGES,
} from '../../constants/KeywordResearch';

/* Actions */
import { resetKeywordResearch } from '../../actions/KeywordResearch';
import { setUserOnboardingResources } from '../../actions/UserOnboarding';

/* Components */
import PageHeader from '../../components/PageHeader';
import ProductMetaInformation from '../../components/ProductMetaInformation';
import ProductLabel from '../../components/ProductLabel';

/* Containers */
import KeywordReverse from './KeywordReverse';
import KeywordDatabase from './KeywordDatabase';
import KeywordTracker from './KeywordTracker';
import ZapierIntegration from './ZapierIntegration';

/* Onboarding Resources */
import reverseOnBoardingResources from '../../assets/onboardingResources/KeywordResearch/keywordReverseOnboarding.json';
// eslint-disable-next-line max-len
import databaseOnBoardingResources from '../../assets/onboardingResources/KeywordResearch/keywordDatabaseOnboarding.json';
import trackerOnBoardingResources from '../../assets/onboardingResources/KeywordResearch/keywordTrackerOnboarding.json';

interface Props {
  match: any;
  history: any;
  userOnboarding: boolean;
  userOnboardingResources: any[];
  resetKeywordResearch: () => void;
  setUserOnboardingResources: (payload: any) => void;
}

const KeywordResearch = (props: Props) => {
  const {
    match,
    resetKeywordResearch,
    setUserOnboardingResources,
    userOnboardingResources,
    userOnboarding,
    history,
  } = props;

  const [selectedTabList, setSelectedTabList] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setSelectedTabList(index);
    history.push(KEYWORD_RESEARCH_PAGES[index]);
  };

  /* To update tab based on url */
  useEffect(() => {
    const currentIndex = KEYWORD_RESEARCH_PAGES.findIndex(
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
    // set resources for keyword database
    if (selectedTabList === 0) {
      setUserOnboardingResources(reverseOnBoardingResources);
    } else if (selectedTabList === 1) {
      setUserOnboardingResources(databaseOnBoardingResources);
    } else if (selectedTabList === 2) {
      setUserOnboardingResources(trackerOnBoardingResources);
    }

    return () => {
      setUserOnboardingResources([]);
    };
  }, [selectedTabList]);

  useEffect(() => {
    return () => {
      resetKeywordResearch();
    };
  }, []);

  /* User onboarding logic */
  const tutorialOnboardingDetails = userOnboardingResources[GENERAL_TUTORIAL_INDEX] || {};
  const showTutorialOnboarding =
    userOnboarding && Object.keys(tutorialOnboardingDetails).length > 0;
  const { youtubeLink, displayText } =
    tutorialOnboardingDetails.Tutorial || FALLBACK_ONBOARDING_DETAILS;

  return (
    <>
      <PageHeader
        title={`Keyword Research`}
        breadcrumb={[
          { content: 'Home', to: '/' },
          {
            content: 'Keyword Research',
            to: '/keyword-research/finder',
          },
          {
            content: KEYWORD_RESEARCH_PRODUCT_DETAILS[selectedTabList].name,
            to: KEYWORD_RESEARCH_PAGES[selectedTabList],
          },
        ]}
        auth={match.params.auth}
      />

      <main className={styles.keywordTrackerPage}>
        {/* Product Meta Information */}
        <ProductMetaInformation
          selectedIndex={selectedTabList}
          informationDetails={KEYWORD_RESEARCH_PRODUCT_DETAILS}
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
                  label="FINDER"
                  icon="Keyword Finder"
                  isActive={selectedTabList === 0}
                />
              </Tab>
              <Tab>
                <ProductLabel
                  label="DATABASE"
                  icon="Keyword Database"
                  isActive={selectedTabList === 1}
                />
              </Tab>
              <Tab>
                <ProductLabel
                  label="TRACKER"
                  icon="Keyword Tracker"
                  isActive={selectedTabList === 2}
                />
              </Tab>

              <Tab>
                <ProductLabel label="ZAPIER" icon="Zapier" isActive={selectedTabList === 3} />
              </Tab>
            </TabList>

            <TabPanel>
              <KeywordReverse />
            </TabPanel>

            <TabPanel>
              <KeywordDatabase />
            </TabPanel>

            <TabPanel>
              <KeywordTracker />
            </TabPanel>

            <TabPanel>
              <ZapierIntegration />
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
    resetKeywordResearch: () => dispatch(resetKeywordResearch()),
    setUserOnboardingResources: (payload: any) => dispatch(setUserOnboardingResources(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KeywordResearch);
