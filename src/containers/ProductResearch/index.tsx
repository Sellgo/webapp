import React, { useState } from 'react';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import ProductsDatabase from './ProductsDatabase';

/* Components */
import PageHeader from '../../components/PageHeader';
import QuotaMeter from '../../components/QuotaMeter';
import MarketplaceDropdown from '../../components/MarketplaceDropdown';

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
        title={`Product Research`}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Product Research', to: '/product-research' },
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

export default ProductResearch;
