import React, { useEffect, useState } from 'react';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import Inventory from './Inventory';
import OrderPlanning from './OrderPlanning';
import SalesProjection from './SalesProjection';
import MigratingDisplay from './MigratingDisplay';
import PreMigration from './PreMigration';
import TPL from './TPL';

/* Components */
import PageHeader from '../../components/PageHeader';
import ProductMetaInformation from '../../components/ProductMetaInformation';
import ProductLabel from '../../components/ProductLabel';

/* Selectors */
import { getUserOnboarding, getUserOnboardingResources } from '../../selectors/UserOnboarding';

/* Actions */
import { setUserOnboardingResources } from '../../actions/UserOnboarding';

/* Constants */
import {
  PERFECT_STOCK_PRODUCT_DETAILS,
  PERFECT_STOCK_PAGES,
  PERFECT_STOCK_SELLER_STATUS,
} from '../../constants/PerfectStock';
import {
  FALLBACK_ONBOARDING_DETAILS,
  GENERAL_TUTORIAL_INDEX,
} from '../../constants/UserOnboarding';

/* Assets */
import salesProjectionOnboarding from '../../assets/onboardingResources/PerfectStock/salesProjectionOnboarding.json';
/* eslint-disable-next-line */
import orderPlanningInventoryOnboarding from '../../assets/onboardingResources/PerfectStock/orderPlanningInventoryOnboarding.json';
/* eslint-disable-next-line */
import orderPlanningEditOnboarding from '../../assets/onboardingResources/PerfectStock/orderPlanningEditOnboarding.json';
import { getSellerSubscription } from '../../selectors/Subscription';

/* Types */
import { SellerSubscription } from '../../interfaces/Seller';

interface Props {
  history: any;
  match: any;
  setUserOnboardingResources: (payload: any) => void;
  userOnboarding: boolean;
  userOnboardingResources: any[];
  subscription: SellerSubscription;
}

const PerfectStock: React.FC<Props> = props => {
  const {
    match,
    setUserOnboardingResources,
    userOnboardingResources,
    userOnboarding,
    history,
    subscription,
  } = props;

  const [selectedTabList, setSelectedTabList] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setSelectedTabList(index);
    history.push(PERFECT_STOCK_PAGES[index]);
  };

  /* To update tab based on url */
  useEffect(() => {
    const currentIndex = PERFECT_STOCK_PAGES.findIndex(
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
    if (selectedTabList === 1) {
      setUserOnboardingResources(salesProjectionOnboarding);
    } else if (selectedTabList === 2) {
      setUserOnboardingResources(orderPlanningInventoryOnboarding);
    } else if (selectedTabList === 3) {
      setUserOnboardingResources(orderPlanningEditOnboarding);
    }
  }, [selectedTabList]);

  /* User onboarding logic */
  const tutorialOnboardingDetails = userOnboardingResources[GENERAL_TUTORIAL_INDEX] || {};
  const showTutorialOnboarding =
    userOnboarding && Object.keys(tutorialOnboardingDetails).length > 0;
  const { youtubeLink, displayText } =
    tutorialOnboardingDetails.Tutorial || FALLBACK_ONBOARDING_DETAILS;

  /* check url */
  const isEditingOrders = window.location.pathname === PERFECT_STOCK_PAGES[4];

  /* Lock Perfect Stock if user is not migrated */
  if (
    !subscription ||
    subscription.perfect_stock_status === PERFECT_STOCK_SELLER_STATUS.SP_API_FAILED ||
    subscription.perfect_stock_status === PERFECT_STOCK_SELLER_STATUS.SP_API_CONNECTED ||
    subscription.perfect_stock_status === PERFECT_STOCK_SELLER_STATUS.MIGRATION_FAILED ||
    !subscription.perfect_stock_status
  ) {
    return (
      <>
        <PageHeader
          title={`AiStock`}
          breadcrumb={[
            { content: 'Home', to: '/' },
            { content: 'AiStock', to: '/aistock/sales' },
            {
              content: PERFECT_STOCK_PRODUCT_DETAILS[selectedTabList].name,
              to: PERFECT_STOCK_PAGES[selectedTabList],
            },
          ]}
          auth={match.params.auth}
        />
        <PreMigration />
      </>
    );
  } else if (
    subscription.perfect_stock_status === PERFECT_STOCK_SELLER_STATUS.MIGRATION_IN_PROGRESS
  ) {
    return (
      <>
        <PageHeader
          title={`AiStock`}
          breadcrumb={[
            { content: 'Home', to: '/' },
            { content: 'AiStock', to: '/aistock/sales' },
            {
              content: PERFECT_STOCK_PRODUCT_DETAILS[selectedTabList].name,
              to: PERFECT_STOCK_PAGES[selectedTabList],
            },
          ]}
          auth={match.params.auth}
        />
        <MigratingDisplay />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={`AiStock`}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'AiStock', to: '/aistock/sales' },
          {
            content: PERFECT_STOCK_PRODUCT_DETAILS[selectedTabList].name,
            to: PERFECT_STOCK_PAGES[selectedTabList],
          },
        ]}
        auth={match.params.auth}
      />
      <main className={styles.productResearchPage}>
        {/* Product Meta Information */}
        <ProductMetaInformation
          selectedIndex={selectedTabList}
          informationDetails={PERFECT_STOCK_PRODUCT_DETAILS}
          showTutorialOnboarding={showTutorialOnboarding}
          onboardingDisplayText={displayText}
          onboardingYoutubeLink={youtubeLink}
          isNewTutorial={true}
        />
        {/* Filter product selection */}
        <section className={styles.productSelectionList}>
          <Tabs
            className={styles.productTabs}
            selectedTabClassName={styles.activeProductTab}
            onSelect={handleTabChange}
            selectedIndex={selectedTabList}
          >
            <TabList
              className={`
              ${styles.productTabList} 
              ${isEditingOrders ? styles.productTabList__hidden : ''}`}
            >
              <Tab className={styles.disabledTab}>
                <ProductLabel
                  label="Cash Flow"
                  icon="Perfect Stock Home"
                  isActive={false}
                  isDisabled
                  isIncoming
                />
              </Tab>
              <Tab>
                <ProductLabel
                  label="Sales Forecasting"
                  icon="Sales Estimation"
                  isActive={selectedTabList === 1}
                  isBeta
                />
              </Tab>
              <Tab>
                <ProductLabel
                  label="Order Planning"
                  icon="Order Planning"
                  isActive={selectedTabList === 2}
                  isBeta
                />
              </Tab>
              <Tab>
                <ProductLabel
                  label="3PL Manager"
                  icon="Tpl"
                  isActive={selectedTabList === 3}
                  isBeta
                />
              </Tab>
              <Tab />
            </TabList>

            <TabPanel />

            <TabPanel>
              <SalesProjection />
            </TabPanel>

            <TabPanel>
              <Inventory />
            </TabPanel>

            <TabPanel>
              <TPL />
            </TabPanel>

            <TabPanel>
              <OrderPlanning />
            </TabPanel>
          </Tabs>
        </section>

        {/* <GetStarted /> */}
      </main>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userOnboarding: getUserOnboarding(state),
    userOnboardingResources: getUserOnboardingResources(state),
    subscription: getSellerSubscription(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUserOnboardingResources: (payload: any) => dispatch(setUserOnboardingResources(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PerfectStock);
