import React from 'react';
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
import {
  fetchCashflowOnboardingStatus,
  updateCashflowOnboardingStatus,
} from '../../../../../actions/PerfectStock/Home';
import { RECONCILE_SETTINGS_OPTIONS } from '../../../../../constants/PerfectStock/Cashflow';

interface Props {
  cashflowOnboardingStatus: any[];
  updateCashflowOnboardingStatus: (onboardingCostId: number, newStatus: boolean) => void;
  fetchCashflowOnboardingStatus: () => void;
}

const CashFlowReconcileCore = (props: Props) => {
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

      const cashflowOnboardingStatusReconcile = cashflowOnboardingStatus?.find(
        cost => cost?.step_name === 'reconcile'
      );

      if (patchExpenseStatus && postExpenseStatus) {
        if (cashflowOnboardingStatusReconcile) {
          updateCashflowOnboardingStatus(cashflowOnboardingStatusReconcile.id, true);
        }
        success('Cash credits successfully saved');
      }
    } catch (err) {
      error('Failed to save cash credits');
      console.error(err);
    }
  };

  return (
    <div className={styles.settingsTableRow}>
      <SettingsInputTable
        tableColumns={RECONCILE_SETTINGS_OPTIONS}
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

export default connect(mapStateToProps, mapDispatchToProps)(CashFlowReconcileCore);
