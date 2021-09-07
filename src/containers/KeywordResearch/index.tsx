import React, { useState, useEffect } from 'react';
import { TabList, TabPanel, Tabs, Tab } from 'react-tabs';
import { connect } from 'react-redux';

/* Components */
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

interface Props {
  match: any;
  resetKeywordResearch: () => void;
}

const keywordResearchMapper = ['Reverse', 'Database', 'Tracker'];

const KeywordResearch = (props: Props) => {
  const { match, resetKeywordResearch } = props;

  const [selectedTabList, setSelectedTabList] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setSelectedTabList(index);
  };

  useEffect(() => {
    return () => {
      resetKeywordResearch();
    };
  }, []);

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
  };
};
export default connect(null, mapDispatchToProps)(KeywordResearch);
