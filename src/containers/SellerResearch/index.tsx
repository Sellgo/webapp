import React, { useState } from 'react';

import { TabList, TabPanel, Tabs, Tab } from 'react-tabs';

/* Components */
import styles from './index.module.scss';

/* Components */
import PageHeader from '../../components/PageHeader';
import QuotaMeter from '../../components/QuotaMeter';
import MarketplaceDropdown from '../../components/MarketplaceDropdown';

/* Containers */
import MapPanel from './MapsPanel';

interface Props {
  match: any;
}

const SellerResearchMapper = ['Maps', 'Sellers', 'Inventories'];

const SellerResearch = (props: Props) => {
  const { match } = props;

  const [selectedTabList, setSelectedTabList] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setSelectedTabList(index);
  };

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

      <main>
        {/* Filter meta data */}
        <section className={styles.filterMetaData}>
          <h1>Product Research: {SellerResearchMapper[selectedTabList]}</h1>
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
              {SellerResearchMapper.map((product: string, index: number) => {
                return <Tab key={index}>{product}</Tab>;
              })}
            </TabList>

            <TabPanel>
              <MapPanel />
            </TabPanel>

            <TabPanel>
              <h1>Sellers</h1>
            </TabPanel>

            <TabPanel>
              <h1>Inventories</h1>
            </TabPanel>
          </Tabs>
        </section>
      </main>
    </>
  );
};

export default SellerResearch;
