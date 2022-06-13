import React, { useEffect, useState } from 'react';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import Inventory from './Inventory';
import OrderPlanning from './OrderPlanning';
import SalesProjection from './SalesProjection';
import MigratingDisplay from './MigratingDisplay';
import PreMigration from './PreMigration';
import TPL from './TPL';
import Home from './Cashflow';
import EmployeeExpensesSettings from './Cashflow/Settings/EmployeeExpenses';
import PpcExpensesSettings from './Cashflow/Settings/PpcExpenses';
import MiscExpensesSettings from './Cashflow/Settings/MiscExpenses';
import DaysOfInventorySettings from './Inventory/Settings/DaysOfInventory';
import SkuSettings from './Inventory/Settings/SkuSettings';
import PaymentTermsSettings from './Inventory/Settings/PaymentTerms';
import DutySettings from './Inventory/Settings/DutySettings';

/* Components */
import PageHeader from '../../components/PageHeader';
import ProductMetaInformation from '../../components/ProductMetaInformation';
import ProductLabel from '../../components/ProductLabel';
import NavigationButton from '../../components/NavigationButton';

/* Selectors */
import { getUserOnboarding, getUserOnboardingResources } from '../../selectors/UserOnboarding';

/* Actions */
import { setUserOnboardingResources } from '../../actions/UserOnboarding';
import {
  fetchCashflowOnboardingStatus,
  updateCashflowOnboardingStatus,
} from '../../actions/PerfectStock/Home';

/* Constants */
import {
  PERFECT_STOCK_PRODUCT_DETAILS,
  PERFECT_STOCK_PAGES,
  PERFECT_STOCK_SELLER_STATUS,
  HIDE_TAB_PAGES,
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

/* Selectors */
import { getSellerSubscription } from '../../selectors/Subscription';
import { getCashflowOnboardingStatus } from '../../selectors/PerfectStock/Cashflow';

/* Types */
import { SellerSubscription } from '../../interfaces/Seller';

interface Props {
  history: any;
  match: any;
  setUserOnboardingResources: (payload: any) => void;
  userOnboarding: boolean;
  userOnboardingResources: any[];
  cashflowOnboardingStatus: any[];
  subscription: SellerSubscription;
  updateCashflowOnboardingStatus: (onboardingCostId: number, newStatus: boolean) => void;
  fetchCashflowOnboardingStatus: () => void;
}

const PerfectStock: React.FC<Props> = props => {
  const {
    match,
    cashflowOnboardingStatus,
    setUserOnboardingResources,
    userOnboardingResources,
    userOnboarding,
    history,
    subscription,
    updateCashflowOnboardingStatus,
    fetchCashflowOnboardingStatus,
  } = props;

  const [selectedTabList, setSelectedTabList] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setSelectedTabList(index);
    history.push(PERFECT_STOCK_PAGES[index]);
  };

  const settingsPageUrl = PERFECT_STOCK_PRODUCT_DETAILS[selectedTabList].settings;
  const settingsName = PERFECT_STOCK_PRODUCT_DETAILS[selectedTabList].name;
  const redirectToSettingsPage = () => {
    history.push(settingsPageUrl);
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
    if (selectedTabList === 0) {
      setUserOnboardingResources(salesProjectionOnboarding);
    } else if (selectedTabList === 1) {
      setUserOnboardingResources(orderPlanningInventoryOnboarding);
    } else if (selectedTabList === 4) {
      setUserOnboardingResources(orderPlanningEditOnboarding);
    }
  }, [selectedTabList]);

  useEffect(() => {
    fetchCashflowOnboardingStatus();
  }, []);

  /* User onboarding logic */
  const tutorialOnboardingDetails = userOnboardingResources[GENERAL_TUTORIAL_INDEX] || {};
  const showTutorialOnboarding =
    userOnboarding && Object.keys(tutorialOnboardingDetails).length > 0;
  const { youtubeLink, displayText } =
    tutorialOnboardingDetails.Tutorial || FALLBACK_ONBOARDING_DETAILS;

  /* check url */
  const hideTabs = HIDE_TAB_PAGES.includes(window.location.pathname);

  /* Lock AiStock if user is not migrated */
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
            <div className={styles.tabListWrapper}>
              <TabList
                className={`
                ${styles.productTabList} 
                ${hideTabs ? styles.productTabList__hidden : ''}`}
              >
                <Tab>
                  <ProductLabel
                    label="Sales Forecasting"
                    icon="Sales Estimation"
                    isActive={selectedTabList === 0}
                    isBeta
                  />
                </Tab>
                <Tab>
                  <ProductLabel
                    label="Order Planning"
                    icon="Order Planning"
                    isActive={selectedTabList === 1}
                    isBeta
                  />
                </Tab>
                <Tab>
                  <ProductLabel
                    label="3PL Manager"
                    icon="Tpl"
                    isActive={selectedTabList === 2}
                    isBeta
                  />
                </Tab>
                <Tab>
                  <ProductLabel
                    label="Cash Flow"
                    icon="Perfect Stock Home"
                    isActive={selectedTabList === 3}
                    isBeta
                  />
                </Tab>
                <Tab />
              </TabList>
              {settingsPageUrl && (
                <NavigationButton onClick={redirectToSettingsPage}>
                  <Icon name="setting" />
                  {settingsName} Settings
                </NavigationButton>
              )}
            </div>

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
              <Home />
            </TabPanel>

            <TabPanel>
              <OrderPlanning />
            </TabPanel>

            <TabPanel>
              <DaysOfInventorySettings />
            </TabPanel>

            <TabPanel>
              <SkuSettings
                cashflowOnboardingStatus={cashflowOnboardingStatus?.find(
                  cost => cost?.step_name === 'sku'
                )}
                updateCashflowOnboardingStatus={updateCashflowOnboardingStatus}
              />
            </TabPanel>

            <TabPanel>
              <DutySettings
                cashflowOnboardingStatus={cashflowOnboardingStatus?.find(
                  cost => cost?.step_name === 'duty'
                )}
                updateCashflowOnboardingStatus={updateCashflowOnboardingStatus}
              />
            </TabPanel>

            <TabPanel>
              <PaymentTermsSettings
                cashflowOnboardingStatus={cashflowOnboardingStatus?.find(
                  cost => cost?.step_name === 'payment_terms'
                )}
                updateCashflowOnboardingStatus={updateCashflowOnboardingStatus}
              />
            </TabPanel>

            <TabPanel>
              <EmployeeExpensesSettings
                cashflowOnboardingStatus={cashflowOnboardingStatus?.find(
                  cost => cost?.step_name === 'employee'
                )}
                updateCashflowOnboardingStatus={updateCashflowOnboardingStatus}
              />
            </TabPanel>

            <TabPanel>
              <PpcExpensesSettings
                cashflowOnboardingStatus={cashflowOnboardingStatus?.find(
                  cost => cost?.step_name === 'ppc'
                )}
                updateCashflowOnboardingStatus={updateCashflowOnboardingStatus}
              />
            </TabPanel>

            <TabPanel>
              <MiscExpensesSettings
                cashflowOnboardingStatus={cashflowOnboardingStatus?.find(
                  cost => cost?.step_name === 'misc'
                )}
                updateCashflowOnboardingStatus={updateCashflowOnboardingStatus}
              />
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
    cashflowOnboardingStatus: getCashflowOnboardingStatus(state),
    userOnboarding: getUserOnboarding(state),
    userOnboardingResources: getUserOnboardingResources(state),
    subscription: getSellerSubscription(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUserOnboardingResources: (payload: any) => dispatch(setUserOnboardingResources(payload)),
    updateCashflowOnboardingStatus: (onboardingCostId: number, newStatus: boolean) =>
      dispatch(updateCashflowOnboardingStatus(onboardingCostId, newStatus)),
    fetchCashflowOnboardingStatus: () => dispatch(fetchCashflowOnboardingStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PerfectStock);
