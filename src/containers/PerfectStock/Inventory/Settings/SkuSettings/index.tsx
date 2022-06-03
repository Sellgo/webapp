import React from 'react';
import axios from 'axios';

/* Styles */
import styles from './index.module.scss';

/* Components */
import ElevioArticle from '../../../../../components/ElevioArticle';
import SettingsBanner from '../../../../../components/SettingsBanner';
import SettingsInputTable from '../../../../../components/SettingsInputTable';
import PerfectStockSettingsNav from '../../../../../components/PerfectStockSettingsNav';

/* Constants */
import { AppConfig } from '../../../../../config';
import { sellerIDSelector } from '../../../../../selectors/Seller';
import { error, success } from '../../../../../utils/notifications';
import {
  SKU_SETTINGS_COLUMNS,
  SETTINGS_OPTIONS,
} from '../../../../../constants/PerfectStock/OrderPlanning';

interface Props {
  cashflowOnboardingStatus: any;
  updateCashflowOnboardingStatus: (onboardingCostId: number, newStatus: boolean) => void;
}

const Expenses = (props: Props) => {
  const { cashflowOnboardingStatus, updateCashflowOnboardingStatus } = props;
  const sellerID = localStorage.getItem('userId');

  /* Fetches all the triggers from backend */
  const fetchExpenses = async () => {
    try {
      const { data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/merchant-listing-configs`
      );

      if (data && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.error(err);
    }
    return [];
  };

  const handleSave = async (expenses: any[]) => {
    try {
      let patchExpenseStatus = true;
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/merchant-listing-configs`;
      const { status } = await axios.patch(url, { merchant_listing_configs: expenses });
      if (status !== 200) {
        patchExpenseStatus = false;
      }

      if (patchExpenseStatus) {
        if (cashflowOnboardingStatus) {
          updateCashflowOnboardingStatus(cashflowOnboardingStatus.id, true);
        }
        success('Expenses successfully saved');
      }
    } catch (err) {
      error('Failed to save expenses');
      console.error(err);
    }
  };

  return (
    <main className={styles.leadTimeWrapper}>
      <SettingsBanner
        title="Sku Settings"
        bannerColor="#FD8373"
        textColor="#fff"
        backUrl="/aistock/home"
      />
      <div className={styles.settingsPageWrapper}>
        <PerfectStockSettingsNav settingsPages={SETTINGS_OPTIONS} />
        <div className={styles.settingsTableWrapper}>
          <p>Sku Settings</p>
          <div className={styles.settingsTableRow}>
            <SettingsInputTable
              tableColumns={SKU_SETTINGS_COLUMNS}
              fetchData={fetchExpenses}
              handleSave={handleSave}
              disableCreateNew
            />
            <div className={styles.instructionsBox}>
              <span>Step-By-Step Guide</span>
              <ElevioArticle articleId={'17'} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Expenses;
