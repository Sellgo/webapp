import React from 'react';
import { connect } from 'react-redux';

/* Components */
import HomepageCard from '../../components/HomepageCard';
import HomePageMeta from './HomePageMeta';
import PageHeader from '../../components/PageHeader';

/* Styles */
import styles from './index.module.scss';
import { getSellerSubscription } from '../../selectors/Subscription';

/* Types */
import { SellerSubscription } from '../../interfaces/Seller';

/* Utils */
import { isAistockSubscription, isSellgoSubscription } from '../../utils/subscriptions';

interface Props {
  match: any;
  subscription: SellerSubscription;
}

const MainHomePage = (props: Props) => {
  const { match, subscription } = props;
  // const [isProfitFinderDisabled, setIsProfitFinderDisabled] = React.useState(false);
  // const [profitFinderLink, setProfitFinderLink] = React.useState('/profit-finder');
  // React.useEffect(() => {
  //   let supplier_id = '';
  //   const latest = getLatestSupplier();
  //   if (latest) {
  //     supplier_id = latest.supplier_id;
  //   }
  //   const newProfitFinderLink = `/profit-finder/${supplier_id}`;
  //   setProfitFinderLink(newProfitFinderLink);

  //   if (supplier_id.length === 0) {
  //     setIsProfitFinderDisabled(true);
  //   }
  // }, []);
  return (
    <main className={styles.mainHomePageWrapper}>
      <PageHeader
        title={`Home`}
        breadcrumb={[{ content: 'Home', to: '/' }]}
        auth={match.params.auth}
      />
      <HomePageMeta />
      {isSellgoSubscription(subscription.subscription_id) && (
        <>
          <h2 className={styles.cardWrapperTitle}>Private Label Product Research</h2>
          <div className={styles.homepageCards}>
            <HomepageCard
              label="Chrome Extension"
              desc="Product Validation on Amazon Page"
              to="https://chrome.google.com/webstore/detail/sellgo-extension/gldmigoakdolonchebfnmcfbjihelcec"
              icon={require(`../../assets/images/chromeLogo.svg`)}
              openNewTab
              disabled={false}
            />
            <HomepageCard
              label="Product Database"
              desc="Amazon Product Catalogue"
              to="/product-research/database"
              icon={require(`../../assets/images/productResearchIcon.svg`)}
              disabled={false}
            />
            <HomepageCard
              label="Keyword Finder"
              desc="Reveal Competitor Keywords"
              to="/keyword-research/finder"
              icon={require(`../../assets/images/keywordReverseIcon.svg`)}
              disabled={false}
            />
            <HomepageCard
              label="Keyword Database"
              desc="Check High-Volume Keywords"
              to="/keyword-research/database"
              icon={require(`../../assets/images/keywordDatabaseIcon.svg`)}
              disabled={false}
            />
          </div>
        </>
      )}

      <h2 className={styles.cardWrapperTitle}>Private Label Operation</h2>
      <div className={styles.homepageCards}>
        <HomepageCard
          label="Product Rank Tracker"
          desc="Get to #1 Search Results"
          to="/keyword-research/tracker"
          icon={require(`../../assets/images/keywordTrackerIcon.svg`)}
          disabled={isAistockSubscription(subscription.subscription_id)}
        />
        <HomepageCard
          label="AiStock Sales Forecasting"
          desc="Future Sales Projection"
          to="/aistock/sales"
          icon={require(`../../assets/images/salesProjection.svg`)}
          disabled={isSellgoSubscription(subscription.subscription_id)}
        />
        <HomepageCard
          label="AiStock Order Planning"
          desc="Avoid Stockout and Overstock"
          to="/aistock/order"
          icon={require(`../../assets/images/orderPlanning.svg`)}
          disabled={isSellgoSubscription(subscription.subscription_id)}
        />
        <HomepageCard
          label="AiStock 3PL Manager"
          desc="Storage and Inbound Manager"
          to="/aistock/tpl"
          icon={require(`../../assets/images/tpl.svg`)}
          disabled={isSellgoSubscription(subscription.subscription_id)}
        />
      </div>

      {isSellgoSubscription(subscription.subscription_id) && (
        <>
          {/* <h2 className={styles.cardWrapperTitle}>Wholesale Bulk Analysis</h2>
          <div className={styles.homepageCards}>
            <HomepageCard
              label="Search Management"
              desc="The 1st Step to Wholesale Sourcing"
              to="/synthesis"
              icon={require(`../../assets/images/searchManagementIcon.svg`)}
              disabled={false}
            />
            <HomepageCard
              label="Profit Finder"
              desc="Wholesale Bulk Calculation"
              to={profitFinderLink}
              icon={require(`../../assets/images/profitFinderIcon.svg`)}
              disabled={isProfitFinderDisabled}
            />
          </div> */}

          <h2 className={styles.cardWrapperTitle}>Seller Data</h2>
          <div className={styles.homepageCards}>
            <HomepageCard
              label="Seller Database"
              desc="Discover >1M of Amazon Sellers"
              to="/seller-research/database"
              icon={require(`../../assets/images/sellerDatabaseIcon.svg`)}
              disabled={false}
            />
            <HomepageCard
              label="Seller Map"
              desc="Interactive Map of Amazon Sellers"
              to="/seller-research/map"
              icon={require(`../../assets/images/sellerMapIcon.svg`)}
              disabled={false}
            />
            <HomepageCard
              label="Seller Finder"
              desc="Find More Sellers from Inventories"
              to="/seller-research/finder"
              icon={require(`../../assets/images/sellerFinder.svg`)}
              disabled={false}
            />
          </div>
        </>
      )}
    </main>
  );
};

const mapStateToProps = (state: any) => {
  return {
    subscription: getSellerSubscription(state),
  };
};

export default connect(mapStateToProps)(MainHomePage);
