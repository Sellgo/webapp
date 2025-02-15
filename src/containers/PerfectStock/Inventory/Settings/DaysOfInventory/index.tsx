import React from 'react';
import axios from 'axios';
import { Radio } from 'semantic-ui-react';

/* Styles */
import styles from './index.module.scss';

/* Components */
import ElevioArticle from '../../../../../components/ElevioArticle';
import SettingsBanner from '../../../../../components/SettingsBanner';
import PerfectStockSettingsNav from '../../../../../components/PerfectStockSettingsNav';
import InputFilter from '../../../../../components/FormFilters/InputFilter';
import ActionButton from '../../../../../components/ActionButton';

/* Constants */
import { AppConfig } from '../../../../../config';
import { sellerIDSelector } from '../../../../../selectors/Seller';
import { error, success } from '../../../../../utils/notifications';
import { SETTINGS_OPTIONS } from '../../../../../constants/PerfectStock/OrderPlanning';

const DaysOfInventory = () => {
  const [daysOfInventory, setDaysOfInventory] = React.useState('');
  const sellerID = localStorage.getItem('userId');

  /* Fetches all the triggers from backend */
  const fetchDaysOfInventory = async () => {
    try {
      const { status, data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/perfect-stock/config`
      );

      if (status === 200) {
        setDaysOfInventory(data.expected_sales_days_count || '');
      }
    } catch (err) {
      setDaysOfInventory('');
      console.error(err);
    }
    return [];
  };

  const handleSave = async () => {
    if (!daysOfInventory) {
      error('Please enter a valid days of inventory');
      return;
    }

    try {
      const payload = {
        expected_sales_days_count: daysOfInventory,
      };
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/perfect-stock/config`;

      const { status } = await axios.patch(url, payload);
      if (status === 200) {
        success('Days of inventory successfully saved');
      }
    } catch (err) {
      error('Failed to save days of inventory');
      console.error(err);
    }
  };

  React.useEffect(() => {
    fetchDaysOfInventory();
  }, []);

  return (
    <main className={styles.settingWrapper}>
      <SettingsBanner
        title="Days Of Inventory"
        bannerColor="#FD8373"
        textColor="#fff"
        backUrl="/aistock/order"
      />
      <div className={styles.settingsPageWrapper}>
        <PerfectStockSettingsNav settingsPages={SETTINGS_OPTIONS} />
        <div className={styles.settingsTableWrapper}>
          <p>Set up days of inventory</p>
          <div className={styles.settingsTableRow}>
            <div className={styles.daysOfInventorySettingsBox}>
              <div className={styles.daysOfInventoryRow}>
                <Radio checked />
                &nbsp; At all times &nbsp;
                <InputFilter
                  placeholder={''}
                  value={daysOfInventory}
                  handleChange={setDaysOfInventory}
                  isNumber
                  isInteger
                  isPositiveOnly
                  className={styles.input}
                />
                &nbsp; days
              </div>
              <ActionButton
                className={styles.applyButton}
                variant="secondary"
                type="purpleGradient"
                size="md"
                onClick={handleSave}
                disabled={false}
              >
                Apply
              </ActionButton>
            </div>
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

export default DaysOfInventory;
