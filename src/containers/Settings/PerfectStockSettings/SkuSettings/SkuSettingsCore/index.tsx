import React, { useEffect } from 'react';
import axios from 'axios';
import { Confirm, Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styles */
import styles from './index.module.scss';

/* Components */

import SettingsInputTable from '../../../../../components/SettingsInputTable';

/* Constants */
import { AppConfig } from '../../../../../config';
import { sellerIDSelector } from '../../../../../selectors/Seller';
import { error, success } from '../../../../../utils/notifications';
import { SKU_SETTINGS_COLUMNS } from '../../../../../constants/PerfectStock/OrderPlanning';
import { getCashflowOnboardingStatus } from '../../../../../selectors/PerfectStock/Cashflow';
import {
  fetchCashflowOnboardingStatus,
  updateCashflowOnboardingStatus,
} from '../../../../../actions/PerfectStock/Home';

interface Props {
  cashflowOnboardingStatus: any[];
  updateCashflowOnboardingStatus: (onboardingCostId: number, newStatus: boolean) => void;
  fetchCashflowOnboardingStatus: () => void;
}

const SkusSettingsCore: React.FC<Props> = props => {
  const {
    cashflowOnboardingStatus,
    updateCashflowOnboardingStatus,
    fetchCashflowOnboardingStatus,
  } = props;
  const [saveConfirmation, setSaveConfirmation] = React.useState(false);
  const [isDimensionsUpdated, setIsDimensionsUpdated] = React.useState(false);
  const [toUpdateShipingCosts, setToUpdateShipingCosts] = React.useState(true);
  const [expensesToBeSaved, setExpensesToBeSaved] = React.useState<any[]>([]);
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

  const openConfirmationModal = async (expenses: any[]) => {
    const originalExpenses = await fetchExpenses();
    /* Check if carton_weight or carton_height are changed */
    const newExpenses = expenses.map((expense: any) => {
      const originalExpense = originalExpenses.find(
        (originalExpense: any) => originalExpense.id === expense.id
      );
      if (originalExpense) {
        if (
          originalExpense.weight !== expense.weight ||
          originalExpense.height !== expense.height ||
          originalExpense.length !== expense.length ||
          originalExpense.width !== expense.width ||
          originalExpense.dim_unit !== expense.dim_unit ||
          originalExpense.wt_unit !== expense.wt_unit
        ) {
          expense.is_changed = true;
          setIsDimensionsUpdated(true);
          return expense;
        }
      }
      return expense;
    });
    setExpensesToBeSaved(newExpenses);
    setSaveConfirmation(true);
  };

  const requestUpdateSkuSettings = (
    <div className={styles.skuSettingsConfirm}>
      Updating SKU will impact order planning, 3PL and cash flow, please confirm.
      {isDimensionsUpdated && (
        <div className={styles.updateShippingCostContent}>
          <Checkbox
            checked={toUpdateShipingCosts}
            onChange={() => setToUpdateShipingCosts(!toUpdateShipingCosts)}
          />
          Automatically update new shipping costs with new settings.
        </div>
      )}
    </div>
  );

  useEffect(() => {
    fetchCashflowOnboardingStatus();
  }, []);

  const handleSave = async () => {
    try {
      let patchExpenseStatus = true;
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/merchant-listing-configs`;
      const { status } = await axios.patch(url, {
        update_shipping_cost: isDimensionsUpdated && toUpdateShipingCosts,
        merchant_listing_configs: expensesToBeSaved,
      });
      if (status !== 200) {
        patchExpenseStatus = false;
      }

      const cashflowOnboardingStatusSku = cashflowOnboardingStatus?.find(
        cost => cost?.step_name === 'sku'
      );
      if (patchExpenseStatus) {
        if (cashflowOnboardingStatusSku) {
          updateCashflowOnboardingStatus(cashflowOnboardingStatusSku.id, true);
        }
        success('Skus successfully saved');
      }
    } catch (err) {
      error('Failed to save expenses');
      console.error(err);
    }
    setSaveConfirmation(false);
  };

  return (
    <div>
      <div className={styles.settingsTableRow}>
        <SettingsInputTable
          tableColumns={SKU_SETTINGS_COLUMNS}
          fetchData={fetchExpenses}
          handleSave={openConfirmationModal}
          disableCreateNew
          disableReload
        />
      </div>

      <Confirm
        content={requestUpdateSkuSettings}
        open={saveConfirmation}
        onCancel={() => setSaveConfirmation(false)}
        onConfirm={() => {
          handleSave();
        }}
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

export default connect(mapStateToProps, mapDispatchToProps)(SkusSettingsCore);
