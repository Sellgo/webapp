import React from 'react';
import axios from 'axios';
import { Confirm, Checkbox } from 'semantic-ui-react';

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
          originalExpense.package_weight !== expense.package_weight ||
          originalExpense.package_height !== expense.package_height ||
          originalExpense.package_length !== expense.package_length ||
          originalExpense.package_width !== expense.package_width ||
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
      Update Sku Settings?
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

      if (patchExpenseStatus) {
        if (cashflowOnboardingStatus) {
          updateCashflowOnboardingStatus(cashflowOnboardingStatus.id, true);
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
    <main className={styles.leadTimeWrapper}>
      <SettingsBanner title="Sku Settings" bannerColor="#FD8373" textColor="#fff" />
      <div className={styles.settingsPageWrapper}>
        <PerfectStockSettingsNav settingsPages={SETTINGS_OPTIONS} />
        <div className={styles.settingsTableWrapper}>
          <p>Sku Settings</p>
          <div className={styles.settingsTableRow}>
            <SettingsInputTable
              tableColumns={SKU_SETTINGS_COLUMNS}
              fetchData={fetchExpenses}
              handleSave={openConfirmationModal}
              disableCreateNew
              disableReload
            />
            <div className={styles.instructionsBox}>
              <span>Step-By-Step Guide</span>
              <ElevioArticle articleId={'17'} />
            </div>
          </div>
        </div>
      </div>
      <Confirm
        content={requestUpdateSkuSettings}
        open={saveConfirmation}
        onCancel={() => setSaveConfirmation(false)}
        onConfirm={() => {
          handleSave();
        }}
      />
    </main>
  );
};

export default Expenses;
