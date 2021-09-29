import React, { useEffect, useState } from 'react';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import ProductsDatabase from './ProductsDatabase';

/* Components */
import PageHeader from '../../components/PageHeader';
import QuotaMeter from '../../components/QuotaMeter';
import MarketplaceDropdown from '../../components/MarketplaceDropdown';

/*Actions */
import { setUserOnboardingResources } from '../../actions/UserOnboarding';

/* Assets */
import databaseOnboarding from '../../assets/onboardingResources/ProductResearch/productDatabaseOnboarding.json';

/* Constants */
import { PRODUCT_RESEARCH_PAGES } from '../../constants/ProductResearch';

interface Props {
  history: any;
  match: any;
  setUserOnboardingResources: (payload: any) => void;
}

const productResearchMapper = ['Products', 'Brands', 'Category', 'Competitors'];

const ProductResearch: React.FC<Props> = props => {
  const { match, setUserOnboardingResources, history } = props;

  const [selectedTabList, setSelectedTabList] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setSelectedTabList(index);
    history.push(PRODUCT_RESEARCH_PAGES[index]);
  };

  /* To update tab based on url */
  useEffect(() => {
    const currentIndex = PRODUCT_RESEARCH_PAGES.findIndex(
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUserOnboardingResources: (payload: any) => dispatch(setUserOnboardingResources(payload)),
  };
};

export default connect(null, mapDispatchToProps)(ProductResearch);
