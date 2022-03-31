import React from 'react';

/* Components */
import HomepageCard from '../../components/HomepageCard';
import HomePageMeta from './HomePageMeta';
import PageHeader from '../../components/PageHeader';

/* Styles */
import styles from './index.module.scss';

interface Props {
  match: any;
}

const MainHomePage = (props: Props) => {
  const { match } = props;

  return (
    <main className={styles.mainHomePageWrapper}>
      <PageHeader
        title={`Home`}
        breadcrumb={[{ content: 'Home', to: '/' }]}
        auth={match.params.auth}
      />
      <HomePageMeta />
      <h2 className={styles.cardWrapperTitle}>Private Label Product Research</h2>
      <div className={styles.homepageCards}>
        <HomepageCard
          label="Chrome Extension"
          desc="Product Validation on Amazon Page"
          to="https://chrome.google.com/webstore/detail/sellgo-extension/gldmigoakdolonchebfnmcfbjihelcec"
          icon={require(`../../assets/images/chromeLogo.svg`)}
          openNewTab
        />
        <HomepageCard
          label="Product Database"
          desc="Amazon Product Catalogue"
          to="/product-research/database"
          icon={require(`../../assets/images/productResearchIcon.svg`)}
        />
        <HomepageCard
          label="Keyword Finder"
          desc="Reveal Competitor Keywords"
          to="/keyword-research/finder"
          icon={require(`../../assets/images/keywordReverseIcon.svg`)}
        />
        <HomepageCard
          label="Keyword Database"
          desc="Check High-Volume Keywords"
          to="/keyword-research/database"
          icon={require(`../../assets/images/keywordDatabaseIcon.svg`)}
        />
      </div>

      <h2 className={styles.cardWrapperTitle}>Private Label Operation</h2>
      <div className={styles.homepageCards}>
        <HomepageCard
          label="Product Rank Tracker"
          desc="Get to #1 Search Results"
          to="/keyword-research/tracker"
          icon={require(`../../assets/images/keywordTrackerIcon.svg`)}
        />
        <HomepageCard
          label="AiStock Sales Forecasting"
          desc="Future Sales Projection"
          to="/aistock/sales"
          icon={require(`../../assets/images/salesProjection.svg`)}
        />
        <HomepageCard
          label="AiStock Order Planning"
          desc="Avoid Stockout and Overstock"
          to="/aistock/order"
          icon={require(`../../assets/images/orderPlanning.svg`)}
        />
        <HomepageCard
          label="AiStock 3PL Manager"
          desc="Storage and Inbound Manager"
          to="/aistock/tpl"
          icon={require(`../../assets/images/tpl.svg`)}
        />
      </div>

      <h2 className={styles.cardWrapperTitle}>Wholesale Bulk Analysis</h2>
      <div className={styles.homepageCards}>
        <HomepageCard
          label="Search Management"
          desc="The 1st Step to Wholesale Sourcing"
          to="/synthesis"
          icon={require(`../../assets/images/searchManagementIcon.svg`)}
        />
        <HomepageCard
          label="Profit Finder"
          desc="Wholesale Bulk Calculation"
          to="/profit-finder"
          icon={require(`../../assets/images/profitFinderIcon.svg`)}
        />
      </div>

      <h2 className={styles.cardWrapperTitle}>Seller Data</h2>
      <div className={styles.homepageCards}>
        <HomepageCard
          label="Seller Database"
          desc="Discover >1M of Amazon Sellers"
          to="/seller-research/database"
          icon={require(`../../assets/images/sellerDatabaseIcon.svg`)}
        />
        <HomepageCard
          label="Seller Map"
          desc="Interactive Map of Amazon Sellers"
          to="/seller-research/map"
          icon={require(`../../assets/images/sellerMapIcon.svg`)}
        />
        <HomepageCard
          label="Seller Finder"
          desc="Find More Sellers from Inventories"
          to="/seller-research/finder"
          icon={require(`../../assets/images/sellerFinder.svg`)}
        />
      </div>
    </main>
  );
};

export default MainHomePage;
