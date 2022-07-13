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
import { DUTY_SETTINGS_COLUMNS } from '../../../../../constants/PerfectStock/OrderPlanning';

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

const DutyTaxCore: React.FC<Props> = props => {
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

  useEffect(() => {
    fetchCashflowOnboardingStatus();
  }, []);

  const handleSave = async (expenses: any[]) => {
    try {
      let patchExpenseStatus = true;
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/merchant-listing-configs`;
      const { status } = await axios.patch(url, { merchant_listing_configs: expenses });
      if (status !== 200) {
        patchExpenseStatus = false;
      }

      const cashflowOnboardingStatusDuty = cashflowOnboardingStatus?.find(
        cost => cost?.step_name === 'duty'
      );
      if (patchExpenseStatus) {
        if (cashflowOnboardingStatusDuty) {
          updateCashflowOnboardingStatus(cashflowOnboardingStatusDuty.id, true);
        }
        success('Duties successfully saved');
      }
    } catch (err) {
      error('Failed to save duties');
      console.error(err);
    }
  };

  return (
    <div className={styles.settingsPageWrapper}>
      <div className={styles.settingsTableWrapper}>
        <div className={styles.settingsTableRow}>
          <SettingsInputTable
            tableColumns={DUTY_SETTINGS_COLUMNS}
            fetchData={fetchExpenses}
            handleSave={handleSave}
            disableCreateNew
          />
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DutyTaxCore);
