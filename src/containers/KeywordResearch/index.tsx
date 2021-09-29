import React, { useState, useEffect } from 'react';
import { TabList, TabPanel, Tabs, Tab } from 'react-tabs';
import { connect } from 'react-redux';

/* Styles */
import styles from './index.module.scss';

/* Components */
import PageHeader from '../../components/PageHeader';
import QuotaMeter from '../../components/QuotaMeter';
import MarketplaceDropdown from '../../components/MarketplaceDropdown';

/* Containers */
import KeywordReverse from './KeywordReverse';
import KeywordDatabase from './KeywordDatabase';
import KeywordTracker from './KeywordTracker';

/* Actions */
import { resetKeywordResearch } from '../../actions/KeywordResearch';
import { setUserOnboardingResources } from '../../actions/UserOnboarding';

/* Onboarding Resources */
import reverseOnBoardingResources from '../../assets/onboardingResources/KeywordResearch/keywordReverseOnboarding.json';
// eslint-disable-next-line max-len
import databaseOnBoardingResources from '../../assets/onboardingResources/KeywordResearch/keywordDatabaseOnboarding.json';
import trackerOnBoardingResources from '../../assets/onboardingResources/KeywordResearch/keywordTrackerOnboarding.json';

/* Constants */
import { KEYWORD_RESEARCH_PAGES } from '../../constants/KeywordResearch';

interface Props {
  match: any;
  history: any;
  resetKeywordResearch: () => void;
  setUserOnboardingResources: (payload: any) => void;
}

const keywordResearchMapper = ['Reverse', 'Database', 'Tracker'];

const KeywordResearch = (props: Props) => {
  const { match, resetKeywordResearch, setUserOnboardingResources, history } = props;

  const [selectedTabList, setSelectedTabList] = useState<number>(2);

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
      resetKeywordResearch();
      setUserOnboardingResources([]);
    };
  }, [selectedTabList]);

  return (
    <>
      <PageHeader
        title={`Keyword Research`}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Keyword Research', to: '/keyword-research' },
        ]}
        callToAction={<QuotaMeter />}
        auth={match.params.auth}
      />

      <main className={styles.keywordTrackerPage}>
        {/* Filter meta data */}
        <section className={styles.filterMetaData}>
          <h1>Keyword Research: {keywordResearchMapper[selectedTabList]}</h1>
          <MarketplaceDropdown />
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
              {keywordResearchMapper.map((keywordPrdouct: string) => (
                <Tab key={keywordPrdouct}>{keywordPrdouct}</Tab>
              ))}
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
          </Tabs>
        </section>
      </main>
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    resetKeywordResearch: () => dispatch(resetKeywordResearch()),
    setUserOnboardingResources: (payload: any) => dispatch(setUserOnboardingResources(payload)),
  };
};
export default connect(null, mapDispatchToProps)(KeywordResearch);
