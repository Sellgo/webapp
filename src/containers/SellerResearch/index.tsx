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
import SellerInventory from './SellerInventory';

/* Actions */
import { setUserOnboardingResources } from '../../actions/UserOnboarding';

/* Assets */
import sellerDatabaseOnborading from '../../assets/onboardingResources/SellerResearch/sellerDatabaseOnboarding.json';
import sellerMapOnborading from '../../assets/onboardingResources/SellerResearch/sellerMapOnboarding.json';

interface Props {
  match: any;
  setUserOnboardingResources: (payload: any) => void;
}

const SellerResearchMapper = ['Database', 'Map', 'Inventories'];

const SellerResearch = (props: Props) => {
  const { match, setUserOnboardingResources } = props;

  const [selectedTabList, setSelectedTabList] = useState<number>(2);

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

  return (
    <>
      <PageHeader
        title={`Seller Research`}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Seller Research', to: '/seller-research' },
        ]}
        auth={match.params.auth}
      />

      <main className={styles.sellerResearchPage}>
        {/* Filter meta data */}
        <section className={styles.filterMetaData}>
          <h1>Seller Research: {SellerResearchMapper[selectedTabList]}</h1>
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
              <Tab>Inventory</Tab>
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

export default connect(null, mapDispatchToProps)(SellerResearch);
