import React from 'react';
import axios from 'axios';

/* Styles */
import styles from './index.module.scss';

/* Components */
import SettingsInputTable from '../../../../../components/SettingsInputTable';

/* Constants */
import { AppConfig } from '../../../../../config';
import { ALERTS_MANAGEMENT_SETTINGS_COLUMNS } from '../../../../../constants/PerfectStock';
import { sellerIDSelector } from '../../../../../selectors/Seller';
import { error, success } from '../../../../../utils/notifications';

const AlertsManagementCore = () => {
  const sellerID = localStorage.getItem('userId');

  const fetchAlertConfigs = async () => {
    try {
      const { status, data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/alert-configs`
      );

      if (status === 200 && data.length) {
        console.log(data);
        return data;
      }
    } catch (err) {
      console.error(err);
    }
    return [];
  };

  const handleSave = async (alerts: any[]) => {
    try {
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/alert-configs`;
      await axios.patch(url, { alert_configs: alerts });
      success('Alerts successfully saved');
    } catch (err) {
      error('Failed to save alerts');
      console.error(err);
    }
  };

  return (
    <div className={styles.settingsTableRow}>
      <SettingsInputTable
        tableColumns={ALERTS_MANAGEMENT_SETTINGS_COLUMNS}
        fetchData={fetchAlertConfigs}
        handleSave={handleSave}
        disableCreateNew
        disableReload
      />
    </div>
  );
};

export default AlertsManagementCore;
