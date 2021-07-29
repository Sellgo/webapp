import React, { useState } from 'react';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import ProductPanel from './ProductsPanel';

/* Components */
import PageHeader from '../../components/PageHeader';
import QuotaMeter from '../../components/QuotaMeter';
import MarketplaceDropdown from '../../components/MarketplaceDropdown';
import BrandsPanel from './BrandsPanel';
import CategoryPanel from './CategoryPanel';
import CompetitorsPanel from './CompetitorsPanel';

interface Props {
  match: any;
}

const productResearchMapper = ['Products', 'Brands', 'Category', 'Competitors'];

const ProductResearch: React.FC<Props> = props => {
  const { match } = props;

  const [selectedTabList, setSelectedTabList] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setSelectedTabList(index);
  };

  return (
    <>
      <PageHeader
        title={`Seller Database`}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Seller Map', to: '/seller-map' },
        ]}
        callToAction={<QuotaMeter />}
        auth={match.params.auth}
      />
      <main className={styles.productResearchPage}>
        {/* Filter meta data */}
        <section className={styles.filterMetaData}>
          <h1>Product Research: {productResearchMapper[selectedTabList]}</h1>
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
              <Tab>Products</Tab>
              <Tab>Brands</Tab>
              <Tab>Category</Tab>
              <Tab>Competitors</Tab>
            </TabList>

            <TabPanel>
              <ProductPanel />
            </TabPanel>

            <TabPanel>
              <BrandsPanel />
            </TabPanel>

            <TabPanel>
              <CategoryPanel />
            </TabPanel>

            <TabPanel>
              <CompetitorsPanel />
            </TabPanel>
          </Tabs>
        </section>
      </main>
    </>
  );
};

export default ProductResearch;
