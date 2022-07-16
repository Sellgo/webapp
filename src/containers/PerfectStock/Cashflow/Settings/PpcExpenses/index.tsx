import React from 'react';
import axios from 'axios';

/* Styles */
import styles from './index.module.scss';

/* Components */
import SettingsBanner from '../../../../../components/SettingsBanner';
import SettingsInputTable from '../../../../../components/SettingsInputTable';

/* Constants */
import { AppConfig } from '../../../../../config';
import { sellerIDSelector } from '../../../../../selectors/Seller';
import { error, success } from '../../../../../utils/notifications';
import ElevioArticle from '../../../../../components/ElevioArticle';
import {
  PPC_SETTINGS_COLUMNS,
  SETTINGS_OPTIONS,
} from '../../../../../constants/PerfectStock/Cashflow';
import PerfectStockSettingsNav from '../../../../../components/PerfectStockSettingsNav';

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
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/expense-configs`
      );

      if (data && data.length > 0) {
        return data.filter((data: any) => data.type === 'ppc');
      }
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
          type: 'ppc',
          status: 'active',
        };
      });
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/expense-configs`;

      if (newExpensesPayload.length > 0) {
        const { status } = await axios.post(url, { expense_configs: newExpensesPayload });
        if (status !== 201) {
          postExpenseStatus = false;
        }
      }

      /* Patching current expenses */
      const currentExpenses = expenses.filter((expense: any) => {
        return !expense.isNew;
      });

      if (currentExpenses.length > 0) {
        const { status } = await axios.patch(url, { expense_configs: currentExpenses });
        if (status !== 200) {
          patchExpenseStatus = false;
        }
      }

      if (patchExpenseStatus && postExpenseStatus) {
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
    <main className={styles.settingWrapper}>
      <SettingsBanner
        title="PPC Expenses"
        bannerColor="#FD8373"
        textColor="#fff"
        backUrl="/aistock/home"
      />
      <div className={styles.settingsPageWrapper}>
        <PerfectStockSettingsNav settingsPages={SETTINGS_OPTIONS} />
        <div className={styles.settingsTableWrapper}>
          <p>PPC Expenses Input</p>
          <div className={styles.settingsTableRow}>
            <SettingsInputTable
              tableColumns={PPC_SETTINGS_COLUMNS}
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
