import React, { useEffect, useState } from 'react';
import { TabList, TabPanel, Tabs, Tab } from 'react-tabs';
import { connect } from 'react-redux';

/* Components */
import styles from './index.module.scss';

/* Components */
import PageHeader from '../../components/PageHeader';
import QuotaMeter from '../../components/QuotaMeter';
import MarketplaceDropdown from '../../components/MarketplaceDropdown';

/* Containers */
import SellerMaps from './SellerMaps';
import SellerDatabase from './SellerDatabase';

/* Actions */
import { setUserOnboardingResources } from '../../actions/UserOnboarding';

/* Assets */
import sellerDatabaseOnborading from '../../assets/onboardingResources/SellerResearch/sellerDatabaseOnboarding.json';
import sellerMapOnborading from '../../assets/onboardingResources/SellerResearch/sellerMapOnboarding.json';

/* Constants */
import { SELLER_RESEARCH_PAGES } from '../../constants/SellerResearch'

interface Props {
  match: any;
  setUserOnboardingResources: (payload: any) => void;
  history: any;
}

const SellerResearchMapper = ['Database', 'Map', 'Inventories'];

const SellerResearch = (props: Props) => {
  const { match, setUserOnboardingResources, history } = props;

  const [selectedTabList, setSelectedTabList] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setSelectedTabList(index);
    history.push(SELLER_RESEARCH_PAGES[index]);
  };

  /* To update tab based on url */
  useEffect(() => {
    const currentIndex = SELLER_RESEARCH_PAGES.findIndex((path:string) => path === window.location.pathname);
    /* If on a different tab, redirect to correct tab */
    if (currentIndex !== selectedTabList) {
      if (currentIndex === -1) {
        handleTabChange(0);
      } else {
        handleTabChange(currentIndex);
      }
    }
  }, [match])

  useEffect(() => {
    if (selectedTabList === 0) {
      setUserOnboardingResources(sellerDatabaseOnborading);
    } else if (selectedTabList === 1) {
      setUserOnboardingResources(sellerMapOnborading);
    }
  }, [selectedTabList]);

  return (
    <>
      <PageHeader
        title={`Seller Research`}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Seller Research', to: '/seller-research' },
        ]}
        callToAction={<QuotaMeter />}
        auth={match.params.auth}
      />

      <main className={styles.sellerResearchPage}>
        {/* Filter meta data */}
        <section className={styles.filterMetaData}>
          <h1>Seller Research: {SellerResearchMapper[selectedTabList]}</h1>
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
              <Tab>Sellers</Tab>
              <Tab>Map</Tab>
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

export default connect(null, mapDispatchToProps)(SellerResearch);
