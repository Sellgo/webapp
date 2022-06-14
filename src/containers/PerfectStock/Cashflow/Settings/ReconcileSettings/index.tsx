import React from 'react';
import axios from 'axios';

/* Styles */
import styles from './index.module.scss';

/* Components */
import SettingsBanner from '../../../../../components/SettingsBanner';
import SettingsInputTable from '../../../../../components/SettingsInputTable';
import ElevioArticle from '../../../../../components/ElevioArticle';
import PerfectStockSettingsNav from '../../../../../components/PerfectStockSettingsNav';

/* Constants */
import { AppConfig } from '../../../../../config';
import { sellerIDSelector } from '../../../../../selectors/Seller';
import { error, success } from '../../../../../utils/notifications';
import {
  RECONCILE_SETTINGS_OPTIONS,
  SETTINGS_OPTIONS,
} from '../../../../../constants/PerfectStock/Cashflow';

interface Props {
  cashflowOnboardingStatus: any;
  updateCashflowOnboardingStatus: (onboardingCostId: number, newStatus: boolean) => void;
}

const Expenses = (props: Props) => {
  const { cashflowOnboardingStatus, updateCashflowOnboardingStatus } = props;
  const sellerID = localStorage.getItem('userId');

  const fetchExpenses = async () => {
    try {
      const { data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/cash-flow/reconcile`
      );

      return data;
    } catch (err) {
      console.error(err);
    }
    return [];
  };

  const handleSave = async (expenses: any[]) => {
    try {
      let patchExpenseStatus = true;
      let postExpenseStatus = true;

      /* New expenses */
      const newExpenses = expenses.filter((expense: any) => {
        return expense.isNew;
      });
      const newExpensesPayload = newExpenses.map((expense: any) => {
        return {
          ...expense,
          id: null,
          status: 'active',
        };
      });
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/cash-flow/reconcile`;

      if (newExpensesPayload.length > 0) {
        const { status } = await axios.post(url, { cash_credits: newExpensesPayload });
        if (status !== 201) {
          postExpenseStatus = false;
        }
      }

      /* Patching current expenses */
      const currentExpenses = expenses.filter((expense: any) => {
        return !expense.isNew;
      });

      if (currentExpenses.length > 0) {
        const { status } = await axios.patch(url, { cash_credits: currentExpenses });
        if (status !== 200) {
          patchExpenseStatus = false;
        }
      }

      if (patchExpenseStatus && postExpenseStatus) {
        if (cashflowOnboardingStatus) {
          updateCashflowOnboardingStatus(cashflowOnboardingStatus.id, true);
        }
        success('Cash credits successfully saved');
      }
    } catch (err) {
      error('Failed to save cash credits');
      console.error(err);
    }
  };

  return (
    <main className={styles.leadTimeWrapper}>
      <SettingsBanner
        title="Reconcile Settings"
        bannerColor="#FD8373"
        textColor="#fff"
        backUrl="/aistock/home"
      />
      <div className={styles.settingsPageWrapper}>
        <PerfectStockSettingsNav settingsPages={SETTINGS_OPTIONS} />
        <div className={styles.settingsTableWrapper}>
          <p>Add Reconcile</p>
          <div className={styles.settingsTableRow}>
            <SettingsInputTable
              tableColumns={RECONCILE_SETTINGS_OPTIONS}
              fetchData={fetchExpenses}
              handleSave={handleSave}
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
