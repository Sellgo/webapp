import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

/* Styles */
import styles from './index.module.scss';

/* Components */
import SettingsInputTable from '../../../../../components/SettingsInputTable';

/* Constants */
import { AppConfig } from '../../../../../config';
import { sellerIDSelector } from '../../../../../selectors/Seller';
import { error, success } from '../../../../../utils/notifications';
import { getCashflowOnboardingStatus } from '../../../../../selectors/PerfectStock/Cashflow';
import { PPC_SETTINGS_COLUMNS } from '../../../../../constants/PerfectStock/Cashflow';
import {
  fetchCashflowOnboardingStatus,
  updateCashflowOnboardingStatus,
} from '../../../../../actions/PerfectStock/Home';

interface Props {
  cashflowOnboardingStatus: any[];
  updateCashflowOnboardingStatus: (onboardingCostId: number, newStatus: boolean) => void;
  fetchCashflowOnboardingStatus: () => void;
}

const PpcExpensesCore = (props: Props) => {
  const {
    cashflowOnboardingStatus,
    updateCashflowOnboardingStatus,
    fetchCashflowOnboardingStatus,
  } = props;
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

  useEffect(() => {
    fetchCashflowOnboardingStatus();
  }, []);

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

      const cashflowOnboardingStatusPpc = cashflowOnboardingStatus?.find(
        cost => cost?.step_name === 'ppc'
      );

      if (patchExpenseStatus && postExpenseStatus) {
        if (cashflowOnboardingStatusPpc) {
          updateCashflowOnboardingStatus(cashflowOnboardingStatusPpc.id, true);
        }
        success('Expenses successfully saved');
      }
    } catch (err) {
      error('Failed to save expenses');
      console.error(err);
    }
  };

  return (
    <div className={styles.settingsTableRow}>
      <SettingsInputTable
        tableColumns={PPC_SETTINGS_COLUMNS}
        fetchData={fetchExpenses}
        handleSave={handleSave}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    cashflowOnboardingStatus: getCashflowOnboardingStatus(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateCashflowOnboardingStatus: (onboardingCostId: number, newStatus: boolean) =>
      dispatch(updateCashflowOnboardingStatus(onboardingCostId, newStatus)),
    fetchCashflowOnboardingStatus: () => dispatch(fetchCashflowOnboardingStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PpcExpensesCore);
