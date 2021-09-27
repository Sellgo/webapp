import React, { useEffect, useState } from 'react';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import ProductsDatabase from './ProductsDatabase';

/* Components */
import PageHeader from '../../components/PageHeader';
import MarketplaceDropdown from '../../components/MarketplaceDropdown';

/*Actions */
import { setUserOnboardingResources } from '../../actions/UserOnboarding';

/* Assets */
import databaseOnboarding from '../../assets/onboardingResources/ProductResearch/productDatabaseOnboarding.json';

interface Props {
  match: any;
  setUserOnboardingResources: (payload: any) => void;
}

const productResearchMapper = ['Products', 'Brands', 'Category', 'Competitors'];

const ProductResearch: React.FC<Props> = props => {
  const { match, setUserOnboardingResources } = props;

  const [selectedTabList, setSelectedTabList] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setSelectedTabList(index);
  };

  useEffect(() => {
    if (selectedTabList === 0) {
      setUserOnboardingResources(databaseOnboarding);
    }
  }, [selectedTabList]);

  return (
    <>
      <PageHeader
        title={`Product Research`}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Product Research', to: '/product-research' },
        ]}
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUserOnboardingResources: (payload: any) => dispatch(setUserOnboardingResources(payload)),
  };
};

export default connect(null, mapDispatchToProps)(ProductResearch);
